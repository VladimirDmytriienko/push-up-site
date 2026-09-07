import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { APP_NAME, CONTACT_EMAIL, POLICY_UPDATED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `${APP_NAME} collects nothing. Everything the camera sees is processed on your iPhone and never leaves it.`,
};

export default function Privacy() {
  return (
    <PageShell eyebrow={`Updated ${POLICY_UPDATED}`} title="Privacy">
      <p>
        <strong>
          {APP_NAME} collects no data about you. There is no account, no analytics, and
          nothing is sent anywhere.
        </strong>{" "}
        The rest of this page explains what that means in practice, because a claim like
        that is worth checking rather than believing.
      </p>

      <h2>The camera</h2>
      <p>
        Counting works by measuring how far your chest is from the phone, using the front
        TrueDepth camera. Depth readings are turned into a number of reps as they arrive and
        then discarded.
      </p>
      <p>
        No photo or video is written to storage, and no image is transmitted. The camera runs
        only while a set is in progress and stops when the set ends, when you pause, or when
        the app leaves the screen.
      </p>
      <p>
        Camera access is the only permission requested. Without it the app will not start a
        set, and it says so rather than failing quietly.
      </p>

      <h2>Face data</h2>
      <p>
        <strong>None is collected.</strong> The TrueDepth camera is used here as a
        rangefinder, not as a face sensor: each depth frame becomes a single number — how
        far the nearest surface is from the phone — and is then discarded. Nothing about
        that number is particular to you. Pointed at a wall, the app measures the wall.
      </p>
      <p>
        There is no face detection, recognition, or tracking, no face map, mesh, template
        or faceprint, and nothing that could identify anyone. Nothing derived from the
        camera is stored on the phone or anywhere else, and nothing is shared with any
        third party. Only the number of reps outlives a set.
      </p>

      <h2>What is stored, and where</h2>
      <p>
        Your rep history — how many push-ups on which days, and how long the last set took —
        is kept in a single file inside the app&rsquo;s own storage on your iPhone. Nothing
        else is recorded.
      </p>
      <p>
        That file is reachable only by the app. It leaves your phone only if you back your
        phone up to iCloud or a computer, in which case it is covered by that backup and by
        Apple&rsquo;s terms, not by ours.
      </p>

      <h2>What is not collected</h2>
      <ul>
        <li>No name, email address, or account of any kind.</li>
        <li>No analytics, usage statistics, or crash reporting.</li>
        <li>No advertising, no advertising identifiers, no tracking across apps or sites.</li>
        <li>No location, contacts, health data, or device identifiers.</li>
      </ul>
      <p>
        The app declares this to Apple as well: its privacy manifest reports no collected
        data types and tracking disabled.
      </p>

      <h2>Third parties</h2>
      <p>
        There are none. The app contains no advertising network, no analytics SDK, and no
        cloud service. It works with the phone in flight mode.
      </p>
      <p>
        This website sets no cookies and loads no third-party scripts. It is served by
        Vercel, which — like any web host — records standard server request logs.
      </p>

      <h2>Deleting your data</h2>
      <p>
        <strong>Settings → Start over</strong> erases every rep on record and returns the app
        to how it was on first launch. Deleting the app removes the same data along with it.
        Both are immediate and cannot be undone.
      </p>
      <p>
        There is nothing for us to delete on your behalf, because we never receive anything.
      </p>

      <h2>Children</h2>
      <p>
        The app is not directed at children and collects no personal information from anyone,
        of any age.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the date at the top of this page changes with it. Should the
        app ever begin collecting anything at all, that will be said here plainly and in the
        app before it happens.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy go to{" "}
        <a href={`mailto:${CONTACT_EMAIL}?subject=Privacy`}>{CONTACT_EMAIL}</a>.
      </p>
    </PageShell>
  );
}
