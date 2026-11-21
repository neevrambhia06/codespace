"use client";

import { useState } from "react";
import { NeoLeafLoader } from "@/components/ui/NeoLeafLoader";

export default function LoadingPreviewPage() {
  const [key, setKey] = useState(0);

  return (
    <div className="relative min-h-screen bg-[#D5360C]">
      <NeoLeafLoader
        key={key}
        duration={2400}
        onComplete={() => {
          // Restart after 1 second for continuous live inspection
          setTimeout(() => setKey((k) => k + 1), 1000);
        }}
      />
    </div>
  );
}
