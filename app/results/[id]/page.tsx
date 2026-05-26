"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { generateSummary } from "@/engine/generate-summary";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function ResultPage({
  params,
}: Props) {

  const [auditData, setAuditData] =
    useState<any>(null);

  const [auditResults, setAuditResults] =
    useState<any[]>([]);

  const [summary, setSummary] =
    useState("");

  const [id, setId] =
    useState("");

  useEffect(() => {

    async function loadData() {

      const resolvedParams =
        await params;

      setId(resolvedParams.id);

      const { data, error } =
        await supabase
          .from("audits")
          .select("*")
          .eq("id", resolvedParams.id)
          .single();

      if (error) {

        console.error(error);

        return;
      }

      setAuditData(data);

      setAuditResults(
        data.recommendations || []
      );

      const monthlySavings =
        data.monthly_savings || 0;

      const annualSavings =
        data.annual_savings || 0;

      const generatedSummary =
        generateSummary({
          totalMonthlySavings:
            monthlySavings,

          totalAnnualSavings:
            annualSavings,

          toolCount:
            data.tools?.length || 0,
        });

      setSummary(generatedSummary);
    }

    loadData();

  }, [params]);

  const totalMonthlySavings =
    auditResults.reduce(
      (total, result) =>
        total + result.monthlySavings,
      0
    );

  const totalAnnualSavings =
    auditResults.reduce(
      (total, result) =>
        total + result.annualSavings,
      0
    );

  const efficiencyScore =
    Math.max(
      100 - totalMonthlySavings / 10,
      42
    ).toFixed(0);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl font-bold mb-4">
            AI Spend Audit
          </h1>

          <p className="text-gray-400">
            Report ID: {id}
          </p>

        </div>

        {/* EMPTY STATE */}
        {!auditData && (

          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">

            <h2 className="text-3xl font-bold mb-4">
              Audit Not Found
            </h2>

            <p className="text-gray-400">
              This report may have expired or does not exist.
            </p>

          </div>

        )}

        {auditData && (

          <div className="space-y-8">

            {/* WORTH-IT SCORE */}
            <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-8">

              <p className="text-yellow-300 mb-2">
                Worth-It Efficiency Score
              </p>

              <h2 className="text-7xl font-bold text-yellow-400">
                {efficiencyScore}/100
              </h2>

              <p className="text-gray-300 mt-4">
                Higher scores indicate a more optimized AI spending structure.
              </p>

            </div>

            {/* SAVINGS HERO */}
            <div className="grid md:grid-cols-2 gap-6">

              <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-8">

                <p className="text-green-300 mb-2">
                  Estimated Monthly Savings
                </p>

                <h2 className="text-6xl font-bold text-green-400">
                  ${totalMonthlySavings}
                </h2>

              </div>

              <div className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-8">

                <p className="text-blue-300 mb-2">
                  Estimated Annual Savings
                </p>

                <h2 className="text-6xl font-bold text-blue-400">
                  ${totalAnnualSavings}
                </h2>

              </div>

            </div>

            {/* AI SUMMARY */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

              <div className="flex items-center gap-3 mb-6">

                <div className="h-3 w-3 rounded-full bg-green-400" />

                <p className="text-sm text-green-300 uppercase tracking-wider">
                  AI Executive Summary
                </p>

              </div>

              <p className="text-lg leading-8 text-gray-200 whitespace-pre-line">
                {summary}
              </p>

            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden">

                <p className="text-gray-400 mb-2">
                  Team Size
                </p>

                <h2 className="text-4xl font-bold">
                  {auditData.team_size}
                </h2>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden">

                <p className="text-gray-400 mb-2">
                  Primary Use Case
                </p>

                <h2 className="text-3xl font-bold">
                  {auditData.use_case}
                </h2>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden">

                <p className="text-gray-400 mb-2">
                  Total Monthly Spend
                </p>

                <h2 className="text-3xl md:text-4xl font-bold break-words">
                  ${auditData.total_monthly_spend}
                </h2>

              </div>

            </div>

            {/* TOOL BREAKDOWN */}
            <div className="space-y-6">

              {auditResults.map(
                (result, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  >

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                      <div>

                        <p className="text-sm text-green-400 mb-2">
                          Worth-It Recommendation
                        </p>

                        <h3 className="text-3xl font-bold mb-2">
                          {result.tool}
                        </h3>

                        <p className="text-gray-400">
                          Current Plan: {result.currentPlan}
                        </p>

                        <p className="text-gray-400">
                          Recommended: {result.recommendedPlan}
                        </p>

                      </div>

                      <div className="text-left md:text-right">

                        <p className="text-gray-400">
                          Monthly Savings
                        </p>

                        <h3
                          className={`text-4xl font-bold ${
                            result.monthlySavings > 0
                              ? "text-green-400"
                              : "text-blue-400"
                          }`}
                        >
                          ${result.monthlySavings}
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                          ${result.annualSavings}/year
                        </p>

                      </div>

                    </div>

                    <div
                      className={`mt-6 rounded-xl p-4 ${
                        result.monthlySavings > 0
                          ? "bg-green-500/10 text-green-100"
                          : "bg-blue-500/10 text-blue-100"
                      }`}
                    >
                      {result.reason}
                    </div>

                  </div>
                )
              )}

            </div>

            {/* CONDITIONAL CTA */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 mt-12 text-center">

              {totalMonthlySavings > 500 ? (

                <>

                  <h2 className="text-4xl font-bold mb-4">
                    Unlock Additional Savings
                  </h2>

                  <p className="text-gray-400 mb-8">
                    Your audit indicates substantial AI overspending opportunities.
                    Worth-It recommends speaking with Credex to explore infrastructure credits and advanced optimization strategies.
                  </p>

                  <button className="rounded-full bg-green-500 px-8 py-4 font-semibold text-black hover:bg-green-400 transition">
                    Book Credex Consultation
                  </button>

                </>

              ) : (

                <>

                  <h2 className="text-4xl font-bold mb-4">
                    Your Stack Looks Healthy
                  </h2>

                  <p className="text-gray-400 mb-8">
                    Your current AI tooling appears relatively optimized.
                    Re-run audits periodically as pricing and workflows evolve.
                  </p>

                  <button className="rounded-full bg-white text-black px-8 py-4 font-semibold hover:bg-gray-200 transition">
                    Get Future Optimization Alerts
                  </button>

                </>

              )}

            </div>

          </div>

        )}

      </div>

    </main>
  );
}