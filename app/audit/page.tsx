import AuditForm from "@/components/audit/audit-form";

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">

      <div className="max-w-4xl mx-auto">

        <div className="mb-12 text-center">

          <h1 className="text-5xl font-bold mb-4">
            AI Spend Audit
          </h1>

          <p className="text-gray-400 text-lg">
            Analyze your AI stack and uncover
            optimization opportunities instantly.
          </p>

        </div>

        <AuditForm />

      </div>

    </main>
  );
}