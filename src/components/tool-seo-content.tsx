
import Link from "next/link";
import { tools } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

interface ToolSeoContentProps {
  name: string;
}

const toolSpecificContent: Record<string, { howTo: string; features: string[]; faq: { q: string; a: string }[] }> = {
    "PDF Merge": {
        howTo: "To merge PDFs, simply click the 'Upload' area and select two or more PDF files from your device. You can also drag and drop them. Once uploaded, you can reorder the files by dragging them or using the arrow buttons. When you're ready, click the 'Merge & Download' button to combine them into a single PDF.",
        features: [
            "Combine multiple PDF files into one.",
            "Reorder files easily before merging.",
            "All processing is done in your browser for 100% privacy.",
            "Fast, client-side merging with no server uploads.",
            "No limits on the number of files you can merge."
        ],
        faq: [
            {
                q: "Is this PDF merge tool free?",
                a: "Yes, our PDF Merge tool is completely free to use with no hidden charges or subscriptions."
            },
            {
                q: "Is it safe to upload my documents here?",
                a: "Absolutely. Your files are not uploaded to any server. The entire merging process happens locally in your web browser, so your documents never leave your computer."
            }
        ]
    },
    "Word & Character Counter": {
        howTo: "Simply start typing or paste your text into the text area provided. As you type, the tool will instantly update the counts for words, characters, sentences, and paragraphs in real-time. There's no need to click any buttons; the analysis is immediate.",
        features: [
            "Real-time counting of words and characters.",
            "Accurate sentence and paragraph detection.",
            "Simple, clean interface with no distractions.",
            "Works entirely in your browser, ensuring your text remains private.",
            "No text length limitations."
        ],
        faq: [
            {
                q: "How do you count a 'word'?",
                a: "We count words based on spaces and punctuation. Any sequence of characters separated by a space is generally considered a single word."
            },
            {
                q: "Is my text saved anywhere?",
                a: "No. Your text is processed in your browser and is never sent to or stored on our servers. Your privacy is guaranteed."
            }
        ]
    },
    "QR Code Generator": {
        howTo: "Enter any URL or piece of text into the input field. The QR code will be generated instantly on the right. You can then download the QR code as a PNG image or use the 'Share' button to copy it to your clipboard or share it using your device's native share options.",
        features: [
            "Instantly generate QR codes from URLs or text.",
            "High-quality QR code generation.",
            "Download the QR code as a PNG file.",
            "Easy sharing and copying to clipboard.",
            "Works offline once the page is loaded."
        ],
        faq: [
            {
                q: "Can I use these QR codes for commercial purposes?",
                a: "Yes, the QR codes you generate are completely free to use for any personal or commercial project."
            },
            {
                q: "Do the QR codes expire?",
                a: "No, the QR codes themselves do not expire. They are simply a visual representation of the data you entered. If you link to a URL, the QR code will work as long as the URL is active."
            }
        ]
    }
};


export function ToolSeoContent({ name }: ToolSeoContentProps) {
    const content = toolSpecificContent[name] || {
        howTo: "This tool is simple and easy to use. Follow the instructions on the page to get started.",
        features: ["Feature one description.", "Feature two description.", "Feature three description."],
        faq: [
            { q: "Is this tool free?", a: "Yes, this tool is completely free to use." },
            { q: "Is my data safe?", a: "Yes, all processing is done in your browser, so your data never leaves your computer." }
        ]
    };
    
    const otherTools = tools.filter(tool => tool.name !== name);

    return (
        <Card className="mt-12">
            <CardHeader>
                <CardTitle>About the {name} Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground prose dark:prose-invert max-w-none">
                <section>
                    <h2 className="text-xl font-semibold text-foreground mb-2">How to use the {name}</h2>
                    <p>{content.howTo}</p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold text-foreground mb-2">Features</h2>
                     <ul className="list-disc list-inside space-y-1">
                        {content.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2 className="text-xl font-semibold text-foreground mb-2">Frequently Asked Questions (FAQ)</h2>
                    <div className="space-y-4">
                        {content.faq.map((item, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-foreground">{item.q}</h3>
                                <p>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
                 {otherTools.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Discover Other Tools</h2>
                        <div className="flex flex-wrap gap-2 not-prose">
                            {otherTools.map((tool) => (
                                <Button key={tool.path} variant="outline" asChild>
                                    <Link href={tool.path}>
                                        {tool.name}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </section>
                )}
            </CardContent>
        </Card>
    );
}
