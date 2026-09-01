import Link from "next/link";
import type { ReactNode } from "react";

import { APP_NAME } from "@/lib/site";

type Props = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

/**
 * The frame the two required pages share.
 *
 * They are read once, by someone who arrived with a question or a complaint, so the
 * chrome stays out of the way: a wordmark that goes home, the heading, the text, and
 * a rule. No navigation to get lost in.
 */
export function PageShell({ eyebrow, title, children }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16 sm:py-24">
      <Link
        href="/"
        className="mono text-fg-tertiary transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-4"
      >
        {APP_NAME}
      </Link>

      <header className="mt-14 border-b border-rule pb-8">
        <p className="mono text-fg-tertiary">{eyebrow}</p>
        <h1 className="display mt-3 text-5xl uppercase sm:text-7xl">{title}</h1>
      </header>

      <div className="prose-plain mt-12 flex-1">{children}</div>

      <footer className="mt-20 border-t border-rule pt-6">
        <p className="mono text-fg-tertiary">
          {APP_NAME} · Counted on your iPhone, nowhere else
        </p>
      </footer>
    </div>
  );
}
