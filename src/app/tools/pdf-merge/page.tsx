
import type { Metadata } from 'next';
import { tools } from '@/config/site';
import PdfMergeClient from './pdf-merge-client';

const toolData = tools.find(t => t.path === '/tools/pdf-merge')!;

export const metadata: Metadata = {
    title: toolData.name,
    description: toolData.description,
    keywords: ["combine pdf files", "merge pdf online free", "secure pdf merger", "client-side pdf merge", "join pdfs", "no upload pdf merge", "pdf combiner no sign up", "merge pdf files for free", "how to merge two pdf files", "combine pdf for free online India"],
};

export default function PdfMergePage() {
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
        "ratingValue": "4.8",
        "reviewCount": "120"
      },
      "url": toolData.path,
    }
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <PdfMergeClient tool={{ name, description }} />
        </>
    );
}
