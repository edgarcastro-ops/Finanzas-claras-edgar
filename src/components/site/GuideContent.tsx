import { Link } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";

interface GuideContentProps {
  content: string;
}

export function GuideContent({ content }: GuideContentProps) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => (
          <h2 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")} className="mt-8 scroll-mt-24 font-display text-2xl font-bold text-foreground">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 text-base font-semibold text-foreground">{children}</h3>
        ),
        p: ({ children }) => <p className="mt-5 text-base leading-8 text-muted-foreground">{children}</p>,
        ul: ({ children }) => <ul className="mt-5 list-disc space-y-3 pl-6 text-base leading-7 text-muted-foreground">{children}</ul>,
        ol: ({ children }) => <ol className="mt-5 list-decimal space-y-3 pl-6 text-base leading-7 text-muted-foreground">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        table: ({ children }) => (
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="border-b border-border bg-secondary px-4 py-3 font-semibold">{children}</th>,
        td: ({ children }) => <td className="border-b border-border px-4 py-3 text-muted-foreground">{children}</td>,
        a: ({ href, children }) =>
          href?.startsWith("/") ? (
            <Link to={href} className="font-medium text-brand hover:underline">
              {children}
            </Link>
          ) : (
            <a href={href} className="font-medium text-brand hover:underline" rel="noreferrer">
              {children}
            </a>
          ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
