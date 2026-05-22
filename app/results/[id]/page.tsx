"use client";

import { useEffect, useState } from "react";

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
        setAuditData(JSON.parse(stored));
      }
    }

    loadData();

  }, [params]);

  return (
  <main className="min-h-screen bg-black text-white px-6 py-16">

    <div className="max-w-5xl mx-auto">

      <div className="mb-12">

        <h1 className="text-5xl font-bold mb-4">
          AI Spend Audit
        </h1>

        <p className="text-gray-400">
          Report ID: {id}
        </p>

      </div>

      {auditData && (

        <div className="space-y-8">

          {/* SUMMARY CARDS */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-gray-400 mb-2">
                Team Size
              </p>

              <h2 className="text-4xl font-bold">
                {auditData.teamSize}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-gray-400 mb-2">
                Primary Use Case
              </p>

              <h2 className="text-3xl font-bold">
                {auditData.useCase}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-gray-400 mb-2">
                Total Monthly Spend
              </p>

              <h2 className="text-4xl font-bold">
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

            {auditData.tools.map(
              (tool: any, index: number) => (

                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-2xl font-bold mb-2">
                        {tool.tool}
                      </h3>

                      <p className="text-gray-400">
                        {tool.plan} Plan
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-gray-400">
                        Monthly Spend
                      </p>

                      <h3 className="text-3xl font-bold">
                        ${tool.spend}
                      </h3>

                    </div>

                  </div>

                  <div className="mt-6 text-sm text-gray-400">
                    Seats: {tool.seats}
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