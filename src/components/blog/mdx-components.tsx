import Image from "next/image";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { AssessmentCta } from "@/components/blog/assessment-cta";

type MDXComponents = NonNullable<MDXRemoteProps["components"]>;

function Callout({ type = "info", children }: { type?: "info" | "warning" | "tip" | "danger"; children: React.ReactNode }) {
  const styles = {
    info: "border-l-primary/60 bg-primary/5",
    warning: "border-l-warning/60 bg-warning/5",
    tip: "border-l-secondary-foreground/60 bg-secondary-foreground/5",
    danger: "border-l-destructive/60 bg-destructive/5",
  };

  const labels = { info: "Note", warning: "Warning", tip: "Tip", danger: "Danger" };

  return (
    <div className={`my-6 rounded-r-lg border-l-4 p-4 ${styles[type]}`}>
      <p className="mb-1 text-sm font-semibold text-foreground">{labels[type]}</p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function ImageWithCaption({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <Image src={src} alt={alt} width={0} height={0} sizes="100vw" className="h-auto w-full rounded-lg border border-border" />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="mt-12 mb-4 font-heading text-3xl font-bold text-foreground" {...props} />,
  h2: (props) => <h2 className="mt-10 mb-3 border-t border-white/[0.04] pt-6 font-heading text-2xl font-semibold text-foreground" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-2 font-heading text-xl font-semibold text-foreground" {...props} />,
  p: (props) => <p className="my-4 leading-7 text-foreground/80" {...props} />,
  ul: (props) => <ul className="my-4 ml-6 list-disc space-y-2 text-foreground/80" {...props} />,
  ol: (props) => <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground/80" {...props} />,
  li: (props) => <li className="leading-7 text-foreground/80" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-6 border-l-4 border-primary/40 pl-4 italic text-muted-foreground" {...props} />
  ),
  a: (props) => <a className="text-primary underline underline-offset-4 hover:text-accent" {...props} />,
  code: (props) => <code className="rounded bg-surface px-1.5 py-0.5 text-sm text-accent" {...props} />,
  hr: () => <hr className="my-8 border-border" />,
  Callout,
  ImageWithCaption,
  AssessmentCta: () => <AssessmentCta variant="inline" />,
};
