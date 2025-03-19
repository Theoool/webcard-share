export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = ["1", "2", "3", "4", "5", "6"];
  return slugs.map((slug) => ({ id: slug }));
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <div className=" w-10 h-10 text-xl">{id}</div>;
}
