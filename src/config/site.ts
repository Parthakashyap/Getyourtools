
import type { LucideIcon } from "lucide-react";
import { FileText, QrCode, Type, Rss } from "lucide-react";

export const siteConfig = {
  name: "GetYourTools",
  description: "A hub of free, client-side utility tools. Merge PDFs, count words, generate QR codes, and more, all without sending your data to a server.",
  url: "https://getyourtools.parthakashyap.com", // Replace with your actual domain
  ogImage: "https://getyourtools.parthakashyap.com/og.png", // Replace with your actual og image path
  keywords: [
    "free online tools", 
    "client-side tools", 
    "secure pdf merge", 
    "word count for essays", 
    "qr code for wifi", 
    "privacy focused utilities", 
    "no server upload tools", 
    "browser based tools", 
    "getyourtools", 
    "online tools for students India", 
    "free utilities for office work",
    "document management tools", // New keyword
    "easy pdf tools", // New keyword
    "text analysis tools", // New keyword
    "custom qr codes", // New keyword
    "online productivity tools" // New keyword
  ],
  author: "Partha Pratim Kashyap",
};

export type Tool = {
  name: string;
  description: string;
  path: string;
  icon: LucideIcon;
};

export type NavItem = {
  name: string;
  path: string;
  icon?: LucideIcon;
};

export const mainNav: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog', icon: Rss },
];

export const tools: Tool[] = [
  {
    name: "PDF Merge",
    description: "Combine multiple PDF files into one single document effortlessly.",
    path: "/tools/pdf-merge",
    icon: FileText,
  },
  {
    name: "Word & Character Counter",
    description: "Instantly count words, characters, sentences, and paragraphs.",
    path: "/tools/word-counter",
    icon: Type,
  },
  {
    name: "QR Code Generator",
    description: "Create custom QR codes from any text or URL in seconds.",
    path: "/tools/qr-generator",
    icon: QrCode,
  }
];

export const allNavItems: NavItem[] = [
  ...mainNav,
  ...tools.map(t => ({ name: t.name, path: t.path })),
];
