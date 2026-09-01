import type { Metadata, Viewport } from "next";
import { Anton } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The fallback display face, and the only web font on the site.
 *
 * On macOS and iOS the CSS reaches HelveticaNeue-CondensedBlack first and this never
 * paints — which is most visitors, and why one weight is all it is worth.
 */
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});


const DESCRIPTION =
  "Put the phone on the floor and push. The TrueDepth camera counts every rep, entirely on your iPhone.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Push Up Streak", template: "%s · Push Up Streak" },
  description: DESCRIPTION,
  applicationName: "Push Up Streak",
  openGraph: {
    type: "website",
    siteName: "Push Up Streak",
    title: "Push Up Streak",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

/** One ground, so one theme colour — see the note in globals.css. */
export const viewport: Viewport = {
  themeColor: "#080c0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full antialiased", anton.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
