import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  BadgeDollarSign,
  Brain,
  Sparkles,
  TrendingDown,
} from "lucide-react";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">

        <h1 className="text-2xl font-bold tracking-tight">
          Worth-It
        </h1>

        <Link href="/audit">

          <Button className="rounded-full px-6 transition-all hover:scale-105">

            Run Audit

          </Button>

        </Link>

      </nav>

      {/* HERO */}
      <section className="px-8 py-28 text-center max-w-6xl mx-auto">

        <p className="mb-6 inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">

          AI Spend Optimization Platform

        </p>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-8">

          Stop Overspending
          <br />

          on AI Tools

        </h1>

        <p className="max-w-2xl mx-auto text-xl text-gray-400 leading-8 mb-10">

          Audit your AI stack, uncover hidden overspending,
          and discover optimization opportunities in seconds.

        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Link href="/audit">

            <Button
              size="lg"
              className="rounded-full px-10 py-7 text-lg transition-all hover:scale-105"
            >

              Start Free Audit

            </Button>

          </Link>

          <a href="#how-it-works">

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-10 py-7 text-lg border-white/20 bg-white text-black hover:bg-gray-200 transition-all hover:scale-105"
          >

            View Demo

          </Button>

        </a>

        </div>

      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 px-8 pb-28 max-w-6xl mx-auto">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition">

          <BadgeDollarSign className="mb-6 h-12 w-12 text-green-400" />

          <h3 className="text-2xl font-semibold mb-4">
            Spend Analysis
          </h3>

          <p className="text-gray-400 leading-7">
            Detect overpriced AI plans and uncover unnecessary operational spend across your tooling stack.
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition">

          <TrendingDown className="mb-6 h-12 w-12 text-blue-400" />

          <h3 className="text-2xl font-semibold mb-4">
            Savings Recommendations
          </h3>

          <p className="text-gray-400 leading-7">
            Receive actionable optimization recommendations with estimated monthly and annual savings.
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition">

          <Brain className="mb-6 h-12 w-12 text-purple-400" />

          <h3 className="text-2xl font-semibold mb-4">
            AI Executive Insights
          </h3>

          <p className="text-gray-400 leading-7">
            Generate intelligent executive summaries tailored to your startup's AI infrastructure.
          </p>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="px-8 pb-28 max-w-5xl mx-auto text-center">

        <h2 className="text-5xl font-bold mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="text-5xl font-bold text-gray-600 mb-6">
              01
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              Enter Your Stack
            </h3>

            <p className="text-gray-400 leading-7">
              Add your AI tools, subscriptions, seat counts, and monthly spend.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="text-5xl font-bold text-gray-600 mb-6">
              02
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              Run Intelligent Audit
            </h3>

            <p className="text-gray-400 leading-7">
              Worth-It analyzes pricing inefficiencies and optimization opportunities.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="text-5xl font-bold text-gray-600 mb-6">
              03
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              Reduce AI Costs
            </h3>

            <p className="text-gray-400 leading-7">
              Implement recommendations and improve your AI spend efficiency instantly.
            </p>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="px-8 pb-32">

        <div className="max-w-5xl mx-auto rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-16 text-center">

          <Sparkles className="mx-auto mb-8 h-14 w-14 text-yellow-400" />

          <h2 className="text-5xl font-bold mb-6 leading-tight">

            Your AI Stack Might
            <br />

            Be Overpriced

          </h2>

          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-8 mb-10">

            Discover hidden optimization opportunities and reduce unnecessary AI spending in under 60 seconds.

          </p>

          <Link href="/audit">

            <Button
              size="lg"
              className="rounded-full px-12 py-7 text-lg transition-all hover:scale-105"
            >

              Run Free Audit

            </Button>

          </Link>

        </div>

      </section>

    </main>

  );
}