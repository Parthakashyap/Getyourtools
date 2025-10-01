export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto max-w-5xl py-10 px-4 sm:px-6 lg:px-8">{children}</div>;
}
