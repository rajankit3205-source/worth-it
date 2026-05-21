type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ResultPage({
  params,
}: Props) {

  const { id } = await params;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      
      <div className="text-center">

        <h1 className="text-5xl font-bold mb-6">
          Audit Results
        </h1>

        <p className="text-gray-400 text-lg">
          Report ID: {id}
        </p>

      </div>

    </main>
  );
}