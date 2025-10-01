import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: `Privacy Policy for ${siteConfig.name}. Learn how we handle your data and respect your privacy.`,
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
            <div className="prose dark:prose-invert max-w-none">
                <h1>Privacy Policy for {siteConfig.name}</h1>
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

                <p>Welcome to {siteConfig.name}. We are committed to protecting your privacy. This Privacy Policy explains how we handle your information. Since our tools are designed to be entirely client-side, our policy is very simple.</p>

                <h2>1. Data Collection and Usage</h2>
                <p><strong>We do not collect, store, or transmit any personal data you submit to our tools.</strong></p>
                <p>All the processing for our tools (such as PDF merging, word counting, and QR code generation) happens directly in your web browser on your computer. The files you upload or the text you enter never leave your device and are never sent to our servers or any third-party service. Your data remains completely private and under your control.</p>

                <h2>2. Cookies and Analytics</h2>
                <p>We use basic, anonymous analytics to understand how our visitors use our website, which helps us improve our tools and user experience. This may involve the use of cookies. This data is aggregated and does not contain any personally identifiable information.</p>
                <p>We may use third-party advertising partners, like Google AdSense, to serve ads when you visit our website. These partners may use cookies to collect non-personal information about your visits to this and other websites to provide advertisements about goods and services of interest to you.</p>

                <h2>3. Third-Party Links</h2>
                <p>Our website may contain links to other websites. We are not responsible for the privacy practices of these other sites. We encourage you to be aware when you leave our site and to read the privacy statements of each website that collects personally identifiable information.</p>

                <h2>4. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
                
                <h2>5. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, you can contact us through our <a href="/contact">contact page</a>.</p>
            </div>
        </div>
    );
}
