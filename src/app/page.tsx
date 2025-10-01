
import Image from "next/image";
import Link from 'next/link';
import { tools } from "@/config/site";
import { blogPosts } from "@/config/blog";
import { ToolCard } from "@/components/tool-card";
import { AdsensePlaceholder } from "@/components/adsense-placeholder";
import { CheckCircle, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'home-hero-1');
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              The Ultimate Utility Tool Hub
            </h1>
            <p className="text-lg text-muted-foreground">
              Free, fast, and client-side. Your essential tools, one click away.
              No data ever leaves your browser.
            </p>
          </div>
          <div className="flex justify-center">
              {heroImage && (
                <Image 
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
          </div>
        </section>

        <section className="mb-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose GetYourTools?</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground mb-10">We provide simple, powerful tools that respect your privacy and save you time.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-left">
              <CheckCircle className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">All tools process your data on your device. Nothing is ever uploaded to our servers, ensuring your information remains private.</p>
            </Card>
            <Card className="p-6 text-left">
              <CheckCircle className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Blazing Fast</h3>
              <p className="text-muted-foreground">By running directly in your browser, our tools provide instant results without any network delay. Get your tasks done in seconds.</p>
            </Card>
            <Card className="p-6 text-left">
              <CheckCircle className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Completely Free</h3>
              <p className="text-muted-foreground">All our utilities are offered completely free of charge. No subscriptions, no hidden fees. Just powerful tools at your fingertips.</p>
            </Card>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-10">Our Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.path} tool={tool} />
            ))}
          </div>
        </section>
        
        <section className="mb-24">
          <AdsensePlaceholder className="min-h-[250px]"/>
        </section>

        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">From Our Blog</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground mt-2">Get tips, insights, and updates on productivity and privacy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <Card className="overflow-hidden h-full flex flex-col">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={315}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={post.imageHint}
                  />
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">{post.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0 text-sm text-muted-foreground">
                    {format(new Date(post.date), "MMMM d, yyyy")}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
           <div className="text-center mt-12">
                <Button asChild variant="outline">
                    <Link href="/blog">
                        View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </section>
      </div>
    </div>
  );
}
