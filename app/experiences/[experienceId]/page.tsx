export default async function ExperiencePage({
  params
}: {
  params: Promise<{ experienceId: string }>
}) {
  const { experienceId } = await params;

  return (
    <div>
      <h1>Experience: {experienceId}</h1>
      {/* Add your page content here */}
    </div>
  );
} 