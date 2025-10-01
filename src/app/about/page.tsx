
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us',
    description: `Learn more about ${siteConfig.name}, our mission, and our commitment to providing free, high-quality utility tools.`,
};

export default function AboutPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
            <div className="space-y-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">About {siteConfig.name}</h1>
                <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                    Our mission is to provide simple, powerful, and accessible tools that make your digital life easier. We believe in privacy, speed, and efficiency, which is why all our tools run directly in your browser.
                </p>
            </div>

            <Card className="mt-16">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-bold">Our Core Principles</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-8 text-left">
                    <div className="space-y-3">
                        <CheckCircle className="h-8 w-8 text-primary" />
                        <h3 className="text-xl font-semibold">Privacy First</h3>
                        <p className="text-muted-foreground">
                            We take your privacy seriously. Your data is your own. All tools on {siteConfig.name} process your files and data on your device. Nothing is ever uploaded or stored on our servers.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <CheckCircle className="h-8 w-8 text-primary" />
                        <h3 className="text-xl font-semibold">Intuitive & Fast</h3>
                        <p className="text-muted-foreground">
                            Our tools are designed to be intuitive and lightning-fast. By leveraging your browser's power, we eliminate network latency, giving you instant results without any waiting.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <CheckCircle className="h-8 w-8 text-primary" />
                        <h3 className="text-xl font-semibold">Always Free</h3>
                        <p className="text-muted-foreground">
                            We are committed to keeping our utilities accessible to everyone. All our tools are completely free to use, without subscriptions, usage limits, or hidden costs.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-16 text-center">
                 <h2 className="text-3xl font-bold mb-4">The Creator</h2>
                 <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                    {siteConfig.name} was built by <a href="https://github.com/parthakashyap" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">{siteConfig.author}</a>, a passionate developer dedicated to creating useful and open web applications. We are constantly working on improving existing tools and adding new ones to our collection.
                 </p>
            </div>
        </div>
    );
}
