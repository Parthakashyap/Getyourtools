
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/config/blog';
import { siteConfig } from '@/config/site';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

export const metadata: Metadata = {
    title: 'Blog',
    description: `Articles, tips, and insights on productivity, privacy, and technology from the ${siteConfig.name} team.`,
};

export default function BlogPage() {
    const sortedPosts = blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">From Our Blog</h1>
                <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
                    Explore our latest articles, tips, and insights on productivity, technology, and digital privacy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/80 hover:shadow-lg">
                            <Image
                                src={post.image}
                                alt={post.title}
                                width={600}
                                height={315}
                                className="w-full h-48 object-cover"
                                data-ai-hint={post.imageHint}
                            />
                            <CardHeader>
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-4">
                                <p className="text-muted-foreground text-sm line-clamp-3">{post.description}</p>
                                <div className="text-sm text-muted-foreground">
                                    <time dateTime={post.date}>
                                        {format(new Date(post.date), "MMMM d, yyyy")}
                                    </time>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
