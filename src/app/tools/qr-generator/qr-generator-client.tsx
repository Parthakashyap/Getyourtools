
"use client";

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import type { Tool } from '@/config/site';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { AdsensePlaceholder } from "@/components/adsense-placeholder";
import { Download, Share2, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';

interface QrGeneratorClientProps {
    tool: Omit<Tool, 'path' | 'icon' | 'schema'>;
}

export default function QrGeneratorClient({ tool }: QrGeneratorClientProps) {
    const [text, setText] = useState("https://getyourtools.example.com");
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        setIsLoading(true);
        if (text) {
            QRCode.toDataURL(text, { width: 300, margin: 2, errorCorrectionLevel: 'H' }, (err, url) => {
                if (err) {
                    console.error(err);
                    setQrCodeUrl("");
                    toast({ title: "Error generating QR Code", variant: "destructive" });
                } else {
                    setQrCodeUrl(url);
                }
                setIsLoading(false);
            });
        } else {
            setQrCodeUrl("");
            setIsLoading(false);
        }
    }, [text, toast]);
    
    const handleShare = async () => {
        if (!qrCodeUrl) return;
        try {
            const blob = await (await fetch(qrCodeUrl)).blob();
            const file = new File([blob], 'qrcode.png', { type: blob.type });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'QR Code',
                    text: `QR Code for: ${text}`,
                    files: [file],
                });
            } else if (navigator.clipboard?.write) {
                 await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                 ]);
                 toast({
                    title: "Copied to clipboard",
                    description: "QR code image has been copied.",
                });
            } else {
                 throw new Error("Share/Copy not supported");
            }
        } catch (error) {
             toast({
                title: "Action Failed",
                description: "Your browser does not support sharing or copying images.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold">{tool.name}</h1>
                        <p className="text-muted-foreground mt-2">{tool.description}</p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Enter Your Data</CardTitle>
                            <CardDescription>Type any URL or text to instantly generate a QR code.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="qr-text">URL or Text</Label>
                                <Input
                                    id="qr-text"
                                    placeholder="e.g., https://example.com"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="text-base"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <AdsensePlaceholder />
                </div>

                <div className="md:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Your QR Code</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center gap-4">
                            <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center p-4">
                                {isLoading ? (
                                    <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
                                ) : qrCodeUrl ? (
                                    <img src={qrCodeUrl} alt="Generated QR Code" className="rounded-md border bg-white" />
                                ) : (
                                    <p className="text-muted-foreground text-center text-sm">Enter text to generate a QR code</p>
                                )}
                            </div>
                            <div className="flex gap-2 w-full">
                                <Button asChild className="w-full" disabled={!qrCodeUrl}>
                                    <a href={qrCodeUrl} download="qrcode.png">
                                        <Download className="mr-2 h-4 w-4" /> Download
                                    </a>
                                </Button>
                                <Button variant="outline" className="w-full" onClick={handleShare} disabled={!qrCodeUrl}>
                                    <Share2 className="mr-2 h-4 w-4" /> Share
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <ToolSeoContent name={tool.name} />
        </div>
    );
}
