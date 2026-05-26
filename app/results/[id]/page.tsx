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

  const [loading, setLoading] =
    useState(true);

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

        setLoading(false);

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

      setLoading(false);
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

  if (loading) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="text-center">

          <div className="h-14 w-14 border-4 border-white/20 border-t-green-400 rounded-full animate-spin mx-auto mb-6" />

          <h2 className="text-3xl font-bold mb-3">
            Generating Audit Report
          </h2>

          <p className="text-gray-400">
            Worth-It is analyzing your AI spend...
          </p>

        </div>

      </main>

    );
  }

  return (

    <main className="min-h-screen bg-black text-white px-6 py-16">

      <div className="max-w-5xl mx-auto fade-in">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            AI Spend Audit
          </h1>

          <p className="text-gray-400">
            Report ID: {id}
          </p>

        </div>

        {/* EMPTY STATE */}
        {!auditData && (

          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">

            <h2 className="text-4xl font-bold mb-4">
              Audit Report Not Found
            </h2>

            <p className="text-gray-400 mb-8">
              This report may have expired, been deleted,
              or the URL may be invalid.
            </p>

            <a
              href="/audit"
              className="inline-flex rounded-full bg-white text-black px-8 py-4 font-semibold hover:bg-gray-200 transition"
            >
              Start New Audit
            </a>

          </div>

        )}

        {auditData && (

          <div className="space-y-8">

            {/* SCORE */}
            <div className="rounded-[32px] border border-yellow-500/20 bg-yellow-500/10 p-8">

              <p className="text-yellow-300 mb-3">
                Worth-It Efficiency Score
              </p>

              <h2 className="text-7xl md:text-8xl font-bold text-yellow-400 tracking-tight">
                {efficiencyScore}/100
              </h2>

              <p className="text-gray-300 mt-4 leading-7">
                Higher scores indicate a more optimized and cost-efficient AI tooling structure.
              </p>

            </div>

            {/* SAVINGS */}
            <div className="grid md:grid-cols-2 gap-6">

              <div className="rounded-[32px] border border-green-500/20 bg-green-500/10 p-8">

                <p className="text-green-300 mb-3">
                  Estimated Monthly Savings
                </p>

                <h2 className="text-6xl md:text-7xl font-bold text-green-400 tracking-tight">
                  ${totalMonthlySavings}
                </h2>

              </div>

              <div className="rounded-[32px] border border-blue-500/20 bg-blue-500/10 p-8">

                <p className="text-blue-300 mb-3">
                  Estimated Annual Savings
                </p>

                <h2 className="text-6xl md:text-7xl font-bold text-blue-400 tracking-tight">
                  ${totalAnnualSavings}
                </h2>

              </div>

            </div>

            {/* EXECUTIVE SUMMARY */}
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

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

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 overflow-hidden">

                <p className="text-gray-400 mb-2">
                  Team Size
                </p>

                <h2 className="text-4xl font-bold">
                  {auditData.team_size}
                </h2>

              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 overflow-hidden">

                <p className="text-gray-400 mb-2">
                  Primary Use Case
                </p>

                <h2 className="text-3xl font-bold">
                  {auditData.use_case}
                </h2>

              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 overflow-hidden">

                <p className="text-gray-400 mb-2">
                  Total Monthly Spend
                </p>

                <h2 className="text-3xl md:text-4xl font-bold break-words">
                  ${auditData.total_monthly_spend}
                </h2>

              </div>

            </div>

            {/* RECOMMENDATIONS */}
            <div className="space-y-6">

              {auditResults.map(
                (result, index) => (

                  <div
                    key={index}
                    className="rounded-[32px] border border-white/10 bg-white/5 p-8"
                  >

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                      <div>

                        <p className="text-sm text-green-400 mb-3 uppercase tracking-wider">
                          Worth-It Recommendation
                        </p>

                        <h3 className="text-3xl font-bold mb-3">
                          {result.tool}
                        </h3>

                        <p className="text-gray-400 leading-7">
                          Current Plan: {result.currentPlan}
                        </p>

                        <p className="text-gray-400 leading-7">
                          Recommended: {result.recommendedPlan}
                        </p>

                      </div>

                      <div className="text-left md:text-right">

                        <p className="text-gray-400 mb-2">
                          Monthly Savings
                        </p>

                        <h3
                          className={`text-5xl font-bold tracking-tight ${
                            result.monthlySavings > 0
                              ? "text-green-400"
                              : "text-blue-400"
                          }`}
                        >
                          ${result.monthlySavings}
                        </h3>

                        <p className="text-sm text-gray-500 mt-3">
                          ${result.annualSavings}/year
                        </p>

                      </div>

                    </div>

                    <div
                      className={`mt-8 rounded-2xl p-5 leading-7 ${
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

            {/* CTA */}
            <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-10 mt-12 text-center">

              {totalMonthlySavings > 500 ? (

                <>

                  <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
                    Unlock Additional Savings
                  </h2>

                  <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-8 text-lg">
                    Your audit indicates substantial AI overspending opportunities.
                    Worth-It recommends exploring infrastructure credits and advanced optimization strategies.
                  </p>

                  <button className="rounded-full bg-green-500 px-10 py-5 font-semibold text-black hover:bg-green-400 transition-all hover:scale-105">
                    Book Consultation
                  </button>

                </>

              ) : (

                <>

                  <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
                    Your Stack Looks Healthy
                  </h2>

                  <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-8 text-lg">
                    Your AI tooling appears relatively optimized.
                    Re-run audits periodically as pricing models and workflows evolve.
                  </p>

                  <button className="rounded-full bg-white text-black px-10 py-5 font-semibold hover:bg-gray-200 transition-all hover:scale-105">
                    Get Optimization Alerts
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