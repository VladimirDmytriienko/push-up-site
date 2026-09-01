/**
 * Resolved from the deployment rather than hardcoded.
 *
 * Vercel sets `VERCEL_PROJECT_PRODUCTION_URL` to the production hostname, so metadata,
 * robots and the sitemap are all correct on the free domain today and stay correct the day
 * a custom one is pointed at it — with nothing to remember to change.
 */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

/** The one place contact details and shared facts live, so no page can drift from another. */

export const CONTACT_EMAIL = "push-up-streak@proton.me";

export const APP_NAME = "Push Up Streak";

/**
 * The date the privacy policy last changed, shown on the page.
 *
 * Written by hand on purpose: a build-time date would silently claim the policy was
 * revised every time the site was redeployed, which is exactly the sort of small
 * untruth a privacy page cannot afford.
 */
export const POLICY_UPDATED = "1 September 2026";
