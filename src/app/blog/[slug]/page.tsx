
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { blogPosts, type Post } from '@/config/blog';
import { siteConfig } from '@/config/site';
import { format } from 'date-fns';
import { AdsensePlaceholder } from '@/components/adsense-placeholder';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {};
  }

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      url: postUrl,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
     twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}


export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "url": postUrl,
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
        "@type": "Organization",
        "name": siteConfig.name,
        "logo": {
            "@type": "ImageObject",
            "url": `${siteConfig.url}/favicon.ico`
        }
    }
  };

  return (
    <article className="container mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">{post.title}</h1>
        <div className="text-muted-foreground text-sm">
          <span>By {post.author}</span>
          <span className="mx-2">&bull;</span>
          <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
        </div>
      </header>

      <Image
        src={post.image}
        alt={post.title}
        width={1200}
        height={630}
        className="rounded-lg shadow-lg mb-8 w-full aspect-video object-cover"
        data-ai-hint={post.imageHint}
        priority
      />

      <div className="prose dark:prose-invert max-w-none prose-lg">
          {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('**')) {
                  const title = paragraph.replace(/\*\*/g, '');
                  return <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">{title}</h2>
              }
              return <p key={index}>{paragraph}</p>
          })}
      </div>
      
      <div className="my-12">
        <AdsensePlaceholder />
      </div>
      
    </article>
  );
}
