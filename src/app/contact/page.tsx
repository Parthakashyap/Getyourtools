
"use client";

import { useState } from 'react';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { siteConfig } from '@/config/site';

// export const metadata: Metadata = {
//     title: 'Contact Us',
//     description: `Have a question, feedback, or a suggestion? We would love to hear from you. Get in touch with the ${siteConfig.name} team.`,
// };

export default function ContactPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Contact Form Submission from ${firstName} ${lastName}`;
        const body = `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:contact@${siteConfig.url.replace(/https?:\/\//, '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="container mx-auto max-w-2xl py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Contact Us</h1>
                <p className="text-lg text-muted-foreground">
                    We'd love to hear from you! Whether you have a question, a feature request, or just want to say hello, please feel free to reach out.
                </p>
            </div>

            <Card className="mt-12">
                <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                        This form will open your default email client.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input 
                                    id="first-name" 
                                    placeholder="John" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input 
                                    id="last-name" 
                                    placeholder="Doe" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Your Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="john.doe@example.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea 
                                id="message" 
                                placeholder="Your message here..." 
                                className="min-h-[150px]" 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
