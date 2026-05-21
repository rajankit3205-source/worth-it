import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BadgeDollarSign,
  Brain,
  Sparkles,
  TrendingDown,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-tight">
          Worth-It
        </h1>

        <Link href="/audit">
          <Button className="rounded-full">
            Run Audit
          </Button>
        </Link>
      </nav>

      {/* HERO */}
      <section className="px-8 py-24 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 mb-6">
          AI Spend Optimization for Startups
        </div>

        <h1 className="text-6xl font-bold tracking-tight leading-tight">
          Stop Overpaying <br />
          for AI Tools
        </h1>

        <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto">
          Audit your AI stack, uncover hidden overspending,
          and discover cheaper alternatives in seconds.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <Link href="/audit">
            <Button
              size="lg"
              className="rounded-full px-8"
            >
              Start Free Audit
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 text-black"
          >
            View Demo
          </Button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 px-8 pb-24 max-w-6xl mx-auto">
        
        <Card className="bg-white/5 border-white/10 text-white">
          <CardContent className="p-8">
            <BadgeDollarSign className="mb-4 h-10 w-10" />

            <h3 className="text-2xl font-semibold mb-3">
              Spend Analysis
            </h3>

            <p className="text-gray-400">
              Detect overpriced AI plans and identify
              unnecessary spending across your stack.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 text-white">
          <CardContent className="p-8">
            <TrendingDown className="mb-4 h-10 w-10" />

            <h3 className="text-2xl font-semibold mb-3">
              Savings Recommendations
            </h3>

            <p className="text-gray-400">
              Get actionable recommendations with monthly
              and annual savings estimates instantly.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 text-white">
          <CardContent className="p-8">
            <Brain className="mb-4 h-10 w-10" />

            <h3 className="text-2xl font-semibold mb-3">
              AI-Powered Insights
            </h3>

            <p className="text-gray-400">
              Receive personalized summaries generated
              specifically for your startup stack.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-8 pb-24 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <div className="text-5xl font-bold text-gray-500 mb-4">
              01
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Enter Your Stack
            </h3>

            <p className="text-gray-400">
              Add your AI tools, plans, seats, and spend.
            </p>
          </div>

          <div>
            <div className="text-5xl font-bold text-gray-500 mb-4">
              02
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Run Audit
            </h3>

            <p className="text-gray-400">
              Our engine analyzes inefficiencies and alternatives.
            </p>
          </div>

          <div>
            <div className="text-5xl font-bold text-gray-500 mb-4">
              03
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Save Money
            </h3>

            <p className="text-gray-400">
              Reduce AI costs and optimize your stack instantly.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-8 pb-32 text-center">
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-16">
          
          <Sparkles className="mx-auto mb-6 h-12 w-12" />

          <h2 className="text-4xl font-bold mb-4">
            Your AI Stack Might Be Overpriced
          </h2>

          <p className="text-gray-400 text-lg mb-8">
            Discover hidden savings opportunities in under 60 seconds.
          </p>

          <Link href="/audit">
            <Button
              size="lg"
              className="rounded-full px-10"
            >
              Run Free Audit
            </Button>
          </Link>

        </div>
      </section>

    </main>
  );
}