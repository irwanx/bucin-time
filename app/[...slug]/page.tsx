import GreetingPage from "@/components/greeting-page";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return <GreetingPage useSlug={true} params={params} />;
}