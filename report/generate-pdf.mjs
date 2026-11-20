// Reproducible generator: renders report.html (which embeds architecture.svg,
// produced separately by `npm run diagram` from architecture.mmd) into a
// formal academic PDF using Puppeteer.
//
// Usage: npm run build   (runs the Mermaid diagram step, then this script)
//     or: node generate-pdf.mjs   (assumes architecture.svg already exists)

import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "report.html");
const svgPath = path.join(__dirname, "architecture.svg");
const outPath = path.join(__dirname, "CodeSpace_Technical_Report.pdf");

if (!fs.existsSync(svgPath)) {
  console.error(
    "architecture.svg not found. Run `npm run diagram` first (or `npm run build`)."
  );
  process.exit(1);
}

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.goto("file://" + htmlPath.replace(/\\/g, "/"), {
    waitUntil: "networkidle0",
  });

  // Ensure fonts/layout have settled before measuring/paginating.
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    margin: { top: "16mm", bottom: "14mm", left: "16mm", right: "16mm" },
    headerTemplate: `<div></div>`,
    footerTemplate: `
      <div style="width:100%; font-family:'Times New Roman', Times, serif; font-size:8.5pt; text-align:justify; color:#000000;">
        Page&nbsp;<span class="pageNumber"></span>&nbsp;of&nbsp;<span class="totalPages"></span>
      </div>`,
  });

  console.log("PDF written to:", outPath);
} finally {
  await browser.close();
}
