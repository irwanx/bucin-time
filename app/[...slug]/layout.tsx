import { slugToText } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug;

  const selectedSlug = slugArray[2] || slugArray[1] || slugArray[0];
  const title = slugToText(selectedSlug);
  const description = `Bucin Time spesial untuk ${title}. Rasakan sapaan manis, quotes romantis, dan musik viral yang cocok menemani harimu — dari pagi yang hangat hingga malam yang syahdu.`;
  const ogImageUrl = `https://greeting.irwanx.my.id/api/og?title=${encodeURIComponent(
    title
  )}`;

  return {
    title,
    description,
    keywords: [
      title,
      "kata romantis",
      "musik bucin",
      "pesan cinta harian",
      "lagu viral",
      "quotes harian",
    ],
    openGraph: {
      title: `${title} | Bucin Time`,
      description,
      url: `https://greeting.irwanx.my.id/${slugArray.join("/")}`,
      siteName: "Bucin Time",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Bucin Time - Musik & Kata Romantis",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Bucin Time`,
      description,
      creator: "@abcdefvceek",
      images: [ogImageUrl],
    },
  };
}

export default async function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
