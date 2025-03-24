
import { Metadata } from "next";

// Update the Props type to match Next.js expectations
type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  // Correctly await the params object
  const resolvedParams = await params;
  const favoriteId = resolvedParams.id;
  
  let title = "收藏夹";
  let description = "智能书签管理平台";
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/UserFavorites/GetUserFavorite/${favoriteId}`, {
      next: { revalidate: 60 } // 每分钟重新验证一次
    });
    
    if (res.ok) {
      const data = await res.json();
      title = data.title || "收藏夹";
      description = `${title} - 包含 ${data.card?.length || 0} 个书签的收藏夹`;
    }
  } catch (error) {
    console.error("获取收藏夹数据失败:", error);
  }
  
  return {
    title: title,
    description: description,
    icons: [{ url: '/Vector2.svg' }],
    alternates: {
      canonical: `https://www.theooo.xyz/markboxs/${favoriteId}`,
      types: {
        'application/rss+xml': [{ url: `feed.xml`, title: 'RSS 订阅' }],
      },
    },
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      url: `https://www.theooo.xyz/markboxs/${favoriteId}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['/og-image.png'],
    },
  };
}


export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
