# uPush — site

The website for [uPush](https://github.com/VladimirDmytriienko/push-up), an iOS app
that counts push-ups with the iPhone's TrueDepth camera while the phone lies on the floor
beneath you.

Three pages. Two of them exist because the App Store will not accept a submission without
them, and one exists because the app deserves a page.

| Route | Why |
| --- | --- |
| `/` | Landing page: what it is, the three steps, the screens |
| `/privacy` | Required — the Privacy Policy URL in App Store Connect |
| `/support` | Required — the Support URL |

## The thinking behind how it looks

**It borrows the app's own materials rather than inventing a second brand for the web.**
Colours come from the app's `tokens.ts`, not from sampling screenshots, so the two cannot
drift apart by a shade. The display face is `HelveticaNeue-CondensedBlack` and the mono is
`Menlo` — both ship with macOS and iOS, which is nearly everyone who will read this, so
most visitors get the product's actual type with no web font to download at all. `Anton`
is the fallback for the rest.

**One theme, deliberately.** The app follows the system because you use it at six in the
morning on a floor. A page you read once does not have that problem, and a single dark
ground lets the screenshots — which are bright objects — be the only light on it.

**No tracking.** No analytics, no cookies, no third-party scripts. The privacy page claims
the app collects nothing; a site that watched you while saying so would be an odd way to
make the point.

## Stack

Next 16 (App Router), React 19, Tailwind 4, TypeScript. Every route prerenders static, so
there is no server to keep running and nothing to go stale. Deployed on Vercel.

## Notes for the curious

The screenshots in `public/shots` come from a Release build on the Simulator with a seeded
workout history — the app has not shipped, so no real history is long enough to photograph
yet. A Release build specifically, because a development build draws a floating dev-menu
button over the screen.

The site's own URL is never hardcoded. `SITE_URL` in `src/lib/site.ts` reads Vercel's
`VERCEL_PROJECT_PRODUCTION_URL`, so metadata, `robots.txt` and `sitemap.xml` are correct on
the free domain today and stay correct the day a custom one is pointed at it, with nothing
to remember to change.
