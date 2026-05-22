"use client";

import { useEffect, useState } from "react";
import { runAudit } from "@/engine/audit-engine";

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

  const [id, setId] =
    useState("");

  useEffect(() => {

    async function loadData() {

      const resolvedParams =
        await params;

      setId(resolvedParams.id);

      const stored =
        localStorage.getItem(
          `audit-${resolvedParams.id}`
        );

      if (stored) {

        const parsed =
          JSON.parse(stored);

        setAuditData(parsed);

        const results =
          runAudit(parsed.tools);

        setAuditResults(results);
      }
    }

    loadData();

  }, [params]);

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

        {/* SAVINGS HERO */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-8">

            <p className="text-green-300 mb-2">
              Estimated Monthly Savings
            </p>

            <h2 className="text-6xl font-bold text-green-400">

              $

              {auditResults.reduce(
                (total, result) =>
                  total + result.monthlySavings,
                0
              )}

            </h2>

          </div>

          <div className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-8">

            <p className="text-blue-300 mb-2">
              Estimated Annual Savings
            </p>

            <h2 className="text-6xl font-bold text-blue-400">

              $

              {auditResults.reduce(
                (total, result) =>
                  total + result.annualSavings,
                0
              )}

            </h2>

          </div>

        </div>

        {auditData && (

          <div className="space-y-8">

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden">

                <p className="text-gray-400 mb-2">
                  Team Size
                </p>

                <h2 className="text-4xl font-bold">
                  {auditData.teamSize}
                </h2>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden">

                <p className="text-gray-400 mb-2">
                  Primary Use Case
                </p>

                <h2 className="text-3xl font-bold">
                  {auditData.useCase}
                </h2>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden">

                <p className="text-gray-400 mb-2">
                  Total Monthly Spend
                </p>

                <h2 className="text-3xl md:text-4xl font-bold break-words">

                  $

                  {auditData.tools.reduce(
                    (
                      total: number,
                      tool: any
                    ) =>
                      total + tool.spend,
                    0
                  )}

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
                          Current Plan:
                          {" "}
                          {result.currentPlan}
                        </p>

                        <p className="text-gray-400">
                          Recommended:
                          {" "}
                          {result.recommendedPlan}
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

          </div>

        )}

      </div>

    </main>
  );
}