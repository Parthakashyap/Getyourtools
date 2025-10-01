"use client";

import { useState, useMemo } from "react";
import type { Tool } from "@/config/site";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { AdsensePlaceholder } from "@/components/adsense-placeholder";
import { Label } from "@/components/ui/label";

interface WordCounterClientProps {
    tool: Omit<Tool, 'path' | 'icon' | 'schema'>;
}

export default function WordCounterClient({ tool }: WordCounterClientProps) {
    const [text, setText] = useState("");

    const stats = useMemo(() => {
        if (!text) {
            return { words: 0, characters: 0, sentences: 0, paragraphs: 0 };
        }

        const words = text.match(/\b\w+\b/g)?.length || 0;
        const characters = text.length;
        const sentences = text.split(/[.!?]+/).filter(Boolean).length;
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim() !== "").length;

        return { words, characters, sentences, paragraphs };
    }, [text]);
    
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">{tool.name}</h1>
                <p className="text-muted-foreground mt-2">{tool.description}</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Your Text</CardTitle>
                    <CardDescription>Paste or type your text below for instant analysis.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="text-input" className="sr-only">Text Input</Label>
                    <Textarea
                        id="text-input"
                        placeholder="Start typing here..."
                        className="min-h-[250px] text-base resize-y"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        aria-label="Text input for word counting"
                    />
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">{stats.words}</CardTitle>
                        <CardDescription>Words</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">{stats.characters}</CardTitle>
                        <CardDescription>Characters</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">{stats.sentences}</CardTitle>
                        <CardDescription>Sentences</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">{stats.paragraphs}</CardTitle>
                        <CardDescription>Paragraphs</CardDescription>
                    </CardHeader>
                </Card>
            </div>
            
            <AdsensePlaceholder />

            <ToolSeoContent name={tool.name} />
        </div>
    );
}
