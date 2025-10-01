
import type { Metadata } from 'next';
import { tools } from '@/config/site';
import QrGeneratorClient from './qr-generator-client';

const toolData = tools.find(t => t.path === '/tools/qr-generator')!;

export const metadata: Metadata = {
    title: toolData.name,
    description: toolData.description,
    keywords: ["free qr code generator", "url to qr code", "text to qr code", "generate qr code for link", "download qr code png", "qr code for wifi password", "create qr code for upi payment", "qr code generator online India", "static qr code generator", "business card qr code"],
};

export default function QrGeneratorPage() {
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
        "ratingValue": "4.9",
        "reviewCount": "250"
      },
      "url": toolData.path,
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <QrGeneratorClient tool={{ name, description }} />
        </>
    );
}
