import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { APP_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: `Help with ${APP_NAME}: why counting stops, which iPhones can run it, and how to clear your history.`,
};

export default function Support() {
  return (
    <PageShell eyebrow="Help" title="Support">
      <p>
        Write to{" "}
        <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${APP_NAME} support`)}`}>
          {CONTACT_EMAIL}
        </a>
        . One person reads it, so a sentence about which iPhone you have and what happened is
        usually enough to sort it out.
      </p>
      <p>
        The three things people run into are below. They cover almost everything.
      </p>

      <h2>Common questions</h2>

      <h3>There is no Ready button on my iPhone</h3>
      <p>
        Counting needs the TrueDepth camera — the one behind Face ID. iPhones that unlock
        with a fingerprint instead, such as the iPhone SE, do not have it, and no software
        can add it. On those phones the app says so on the home screen rather than letting
        you start a set that could never work.
      </p>

      <h3>It is not counting my reps</h3>
      <p>Three things stop the count, all of them on purpose:</p>
      <ul>
        <li>
          <strong>The phone is not still.</strong> Counting pauses while the phone is being
          moved or is not lying flat, because a moving phone cannot tell your movement from
          its own. Put it down on the floor, screen up, and give it a moment.
        </li>
        <li>
          <strong>You are out of range.</strong> Line your chin up over the camera. Too far
          away and there is nothing to measure; almost touching the screen is also too close.
        </li>
        <li>
          <strong>The rep was not deep enough.</strong> Partial reps are not counted. Going
          all the way down is what registers.
        </li>
      </ul>

      <h3>How do I clear my history?</h3>
      <p>
        <strong>Settings → Start over.</strong> It erases every rep on record and puts the app
        back to how it was the first time you opened it. It cannot be undone, and it asks
        before doing it.
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>An iPhone with Face ID.</li>
        <li>Camera permission. Nothing is recorded or uploaded — see the <a href="/privacy">privacy page</a>.</li>
        <li>Somewhere to put the phone flat on the floor beneath you.</li>
      </ul>

      <h2>Reporting something broken</h2>
      <p>
        The more specific, the faster it is fixed. Useful things to include: which iPhone,
        which iOS version, what you were doing, and what happened instead of what you
        expected. A screenshot helps more than a description of one.
      </p>
    </PageShell>
  );
}
