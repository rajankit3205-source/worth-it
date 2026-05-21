import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      
      <div className="max-w-3xl text-center">

        <div className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 mb-6">
          AI Spend Audit
        </div>

        <h1 className="text-5xl font-bold tracking-tight leading-tight mb-6">
          Build Your <br />
          AI Spend Report
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Enter your startup’s AI tools, plans, and monthly spend.
          Worth-It will analyze inefficiencies and identify
          potential savings opportunities.
        </p>

        <div className="flex justify-center gap-4">

          <Button
            size="lg"
            className="rounded-full px-8"
          >
            Start Audit
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-black"
            >
              Back Home
            </Button>
          </Link>

        </div>

      </div>

    </main>
  );
}