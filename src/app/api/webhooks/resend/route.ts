import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { prisma } from '@/lib/prisma';

const webhookSecret = process.env.RESEND_WEBHOOK_SECRET || 'whsec_mock';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
    }

    // Initialize Svix with the secret
    const wh = new Webhook(webhookSecret);
    let evt: unknown;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const { type, data } = evt as { type: string; data: Record<string, unknown> };

    // Handle the verified events
    if (type === 'email.delivered' || type === 'email.bounced') {
      const emailTo = (data?.to as string[] | undefined)?.[0] || 'Unknown';
      
      await prisma.auditLog.create({
        data: {
          title: type === 'email.delivered' ? 'Email Delivered' : 'Email Bounced',
          description: `Event ${type} for email sent to ${emailTo}. ID: ${data?.email_id as string | undefined}`,
          time: new Date().toLocaleTimeString(),
        }
      });
      
      console.log(`[Webhook] Processed ${type} for ${emailTo}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook processing failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
