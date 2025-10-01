
import type { Metadata } from 'next';
import { tools } from '@/config/site';
import WordCounterClient from './word-counter-client';

const toolData = tools.find(t => t.path === '/tools/word-counter')!;

export const metadata: Metadata = {
    title: toolData.name,
    description: toolData.description,
    keywords: ["word counter for essays", "character count online", "sentence counter tool", "paragraph counter", "real-time text analysis", "writing statistics tool", "check word count for college application", "word count for ssc exam", "online word calculator", "free word counter India"],
};

export default function WordCounterPage() {
    const { name, description } = toolData;
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": toolData.name,
      "description": toolData.description,
      "applicationCategory": "Utilities",
      "operatingSystem": "Any (Web)",
      "offers": {
        "@type": "Offer",
        "price": "0"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "95"
      },
      "url": toolData.path,
    }
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <WordCounterClient tool={{ name, description }} />
        </>
    );
}
