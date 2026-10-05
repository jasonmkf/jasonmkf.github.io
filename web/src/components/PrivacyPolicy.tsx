import type { ReactNode } from 'react';
import type { App } from '@/data/apps';

const EMAIL = 'support@kf-production.com';

const Ext = ({ href }: { href: string }) => <a href={href}>{href}</a>;

const ADS = <Ext href="https://policies.google.com/technologies/partner-sites" />;

function Tail({ deleting }: { deleting: ReactNode }) {
  return (
    <>
      <h2>Children</h2>
      <p>The app is not directed at children under 13.</p>

      <h2>Deleting your data</h2>
      <p>{deleting} We hold no copy to delete.</p>

      <h2>Changes</h2>
      <p>If this policy changes, the new version will be posted at this address with a new date.</p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </>
  );
}

function Intro({ app, kept, where }: { app: App; kept: string; where: string }) {
  return (
    <p>
      {app.name} (&quot;the app&quot;) is made by KF Production. This policy explains what the app
      does with your information. In short: there is no account, {kept} stay on {where}, and we run
      no servers that receive them.
    </p>
  );
}

function CalendarPolicy({ app, settings }: { app: App; settings: string }) {
  return (
    <>
      <Intro app={app} kept="your settings" where="your device" />

      <h2>What stays on your device</h2>
      <p>
        The holiday and calendar data is built into the app. Your settings, such as {settings}, are
        stored only in the app&apos;s own storage on your device. We cannot see them.
      </p>

      <h2>Your calendar (optional)</h2>
      <p>
        If you allow calendar access, the app reads the events in your own calendars (title, date
        and time, and calendar name) to show them on the matching days. Holiday and subscribed
        calendars are skipped. Events are read on your device while the app shows them; the app does
        not store them or send them anywhere.
      </p>
      <p>
        The app does not change your calendar by itself. &quot;Add to calendar&quot; opens your
        calendar app with a new event on that date, and you decide whether to save it. You can turn
        calendar access off at any time in the system settings.
      </p>

      <h2>Advertising</h2>
      <p>
        The app shows ads from Google AdMob. The AdMob SDK may collect your device&apos;s
        advertising ID, IP address (which gives an approximate location), and information about ad
        interactions and app performance, to serve and measure ads and to prevent fraud. Google may
        use this information to show ads based on your interests. See how Google uses this
        information: {ADS}
      </p>
      <p>You can reset or delete your advertising ID in the system settings.</p>

      <h2>Nothing else is sent</h2>
      <p>
        Apart from ads, the app makes no network requests of its own and contains no analytics.
        &quot;More apps&quot; in Settings opens Google Play.
      </p>

      <h2>Device backup</h2>
      <p>
        Android&apos;s own device backup may copy the app&apos;s settings to your Google account, if
        you have device backup turned on. This is handled by Android, not by us.
      </p>

      <Tail deleting="Clear the app's storage or uninstall it to remove everything it stored on your device." />
    </>
  );
}

function LunarPolicy({ app }: { app: App }) {
  return (
    <>
      <Intro app={app} kept="your settings" where="your iPhone" />

      <h2>What stays on your device</h2>
      <p>
        The holiday data is built into the app and the calendar is worked out on your iPhone. Your
        settings, such as country, language and weekend days, are stored only in the app&apos;s own
        storage. We cannot see them.
      </p>

      <h2>Location (asked once)</h2>
      <p>
        When you first open the app, it asks once for your approximate location, only to choose
        which country to show. iOS turns the location into a country with Apple&apos;s location
        service, which sends the approximate position to Apple. See Apple&apos;s privacy policy:{' '}
        <Ext href="https://www.apple.com/legal/privacy/" />
      </p>
      <p>
        The app keeps only the country, not the location, and does not ask again. If you decline,
        choose your country in Settings.
      </p>

      <h2>Your calendar (optional)</h2>
      <p>
        If you allow calendar access, the app reads the events in your own calendars (title, date
        and time, and calendar name) to show them on the matching days. Subscribed calendars and
        birthdays are skipped. Events are read on your iPhone while the app shows them; the app does
        not store them or send them anywhere.
      </p>
      <p>
        The app does not change your calendar by itself. &quot;Add to calendar&quot; opens the
        iPhone&apos;s event editor with a new event on that date, and you decide whether to save it.
        You can turn calendar access off in Settings &gt; Privacy &amp; Security &gt; Calendars.
      </p>

      <h2>Advertising</h2>
      <p>
        The app shows ads from Google AdMob. The AdMob SDK may collect your IP address (which gives
        an approximate location), device information, and information about ad interactions and app
        performance, to serve and measure ads and to prevent fraud. The app never asks for
        permission to track you, so AdMob cannot read your iPhone&apos;s advertising identifier. See
        how Google uses this information: {ADS}
      </p>

      <h2>Nothing else is sent</h2>
      <p>
        Apart from ads and the one-time location lookup, the app makes no network requests of its
        own and contains no analytics.
      </p>

      <h2>Device backup</h2>
      <p>
        Your iPhone&apos;s backup (iCloud or a computer) may include the app&apos;s settings. This is
        handled by Apple, not by us.
      </p>

      <Tail deleting="Delete the app to remove everything it stored on your iPhone." />
    </>
  );
}

function LoanPolicy({ app, stored, exportFiles }: { app: App; stored: string; exportFiles: boolean }) {
  return (
    <>
      <Intro app={app} kept="your calculations" where="your device" />

      <h2>What stays on your device</h2>
      <p>
        Each calculation is saved in the app&apos;s history on your device ({stored}), so you can
        open it again. Calculations not marked as favourites are deleted after 90 days, and you can
        delete your history or favourites at any time. The income and commitments you enter on the
        affordability screen are not saved. Settings such as language and theme are stored on your
        device too. We cannot see any of this.
      </p>

      <h2>Interest rate</h2>
      <p>
        To pre-fill the interest rate, the app reads the Overnight Policy Rate that Bank Negara
        Malaysia publishes at api.bnm.gov.my, at most once a day. The request carries nothing about
        you; like any web request, it shows your IP address to Bank Negara&apos;s server.
      </p>

      <h2>{exportFiles ? 'Sharing and exporting' : 'Sharing'}</h2>
      <p>
        {exportFiles
          ? 'When you share a result, or export a comparison as a PDF or image,'
          : 'When you share a result,'}{' '}
        the app hands it to the app you choose (for example email or a chat app). Where it goes is
        your choice; the app does not upload it anywhere by itself.
      </p>

      <h2>Advertising</h2>
      <p>
        The app shows ads from Google AdMob. The AdMob SDK may collect your device&apos;s
        advertising ID, IP address (which gives an approximate location), and information about ad
        interactions and app performance, to serve and measure ads and to prevent fraud. See how
        Google uses this information: {ADS}
      </p>
      <p>
        On Android, Google may use this information to show ads based on your interests, and you can
        reset or delete your advertising ID in the system settings. On iPhone the app never asks for
        permission to track you, so AdMob cannot read the iPhone&apos;s advertising identifier.
      </p>

      <h2>Nothing else is sent</h2>
      <p>There is no account or sign-in, and the app contains no analytics.</p>

      <h2>Device backup</h2>
      <p>
        Android&apos;s own device backup may copy the app&apos;s history and settings to your Google
        account, if you have device backup turned on; on iPhone, your iCloud or computer backup may
        include them. This is handled by Android or Apple, not by us.
      </p>

      <Tail deleting="Delete calculations in the app, or clear the app's storage or uninstall it to remove everything." />
    </>
  );
}

// Same text as docs/store/privacy-policy.md in the expiry-date-reminder repo; update both together.
function ShelfbellPolicy() {
  return (
    <>
      <p>
        Shelfbell (&quot;the app&quot;) is made by KF Production. This policy explains what the app
        does with your information. In short: there is no account, your items stay on your device or
        in your own Google Drive, and we run no servers that receive them. We do not collect
        analytics or crash reports of our own.
      </p>

      <h2>What stays on your device</h2>
      <p>
        Items, dates, notes, categories, reminder settings and photos you add are stored in the
        app&apos;s own storage on your device. We cannot see them. Photos are re-saved without their
        metadata, so location and camera details in a photo are removed. The camera is used to take
        photos and to read barcodes and dates on labels; this reading happens on the device.
      </p>

      <h2>Barcode and label reading</h2>
      <p>
        On Android the app reads barcodes and printed dates with Google ML Kit, on the device. The
        camera images, the text read from them and the barcode numbers stay on the device. ML Kit
        sends Google usage and diagnostic information so Google can maintain it: the device model and
        operating system version, the app&apos;s name and version, identifiers for this installation
        that do not identify you or your device, performance (such as how long reading took) and error
        codes. Google says it does not pass this information to third parties. On iPhone and iPad the
        app uses Apple&apos;s Vision framework on the device, and nothing is sent.
      </p>

      <h2>Advertising</h2>
      <p>
        The app shows ads from Google AdMob. The AdMob SDK collects your device&apos;s IP address
        (which may be used to estimate your general location), your interactions with the app and its
        ads (such as app launches, taps and video views), diagnostic information (such as launch time
        and responsiveness), and your device&apos;s advertising ID and app set ID. Google uses this to
        serve and measure ads, for analytics and to prevent fraud. See how Google uses this
        information: {ADS}
      </p>
      <p>
        On iPhone and iPad the app does not ask to track you, so ads are not personalised. On Android
        you can reset or delete your advertising ID in the system settings. In the European Economic
        Area, the UK and Switzerland, Google&apos;s consent form asks for your choices before any ad
        is loaded, and you can change them at any time under Settings &gt; Ad privacy choices.
      </p>

      <h2>Optional product lookup</h2>
      <p>
        If you turn on online product lookup, the barcode you scan is sent to Open Food Facts (
        <Ext href="https://world.openfoodfacts.org" />
        ), a free public product database, to find the product&apos;s name and brand. The request
        contains only the barcode number and the app&apos;s name and version; like any web request it
        also reaches Open Food Facts from your IP address. Lookup is off until you allow it, and you
        can turn it off in Settings. See the Open Food Facts privacy policy:{' '}
        <Ext href="https://world.openfoodfacts.org/privacy" />
      </p>

      <h2>Backup files</h2>
      <p>
        When you export a backup, the app creates a file with your items and photos and hands it to
        the place you choose (for example Files, Google Drive or email). Where it goes is your
        choice; the app does not upload it anywhere by itself. You can protect the file with a
        password.
      </p>

      <h2>Google Drive (optional)</h2>
      <p>
        If you connect Google Drive in Settings, the app keeps its data in a hidden app folder in
        your own Google Drive account: your items, notes and photos when you use sync (you can keep
        photos off Drive with Sync photos: Never), backup files when you back up by hand, and the
        app&apos;s settings (language, theme, reminder defaults) when you turn on Sync settings. The
        name you enter under Your name is saved with the items you add or change, so others using
        the same Google account can see who did it. The app also stores random identifiers there so
        your devices can tell each other apart. If you move your items to another Google account,
        the new account&apos;s email address is left in a note in the old account&apos;s folder, so
        your other devices can offer to switch.
      </p>
      <p>
        The app asks Google only for access to that folder (the drive.appdata permission); it cannot
        see your other Drive files. Sign-in is handled by Google. The data goes straight from your
        device to your Google account over an encrypted connection. We run no server and cannot read
        it. Google&apos;s privacy policy applies to your Drive:{' '}
        <Ext href="https://policies.google.com/privacy" />
      </p>
      <p>
        You can disconnect at any time in Settings &gt; Google Drive, and &quot;Delete cloud
        data&quot; there removes everything the app stored in your Drive. Google Drive &gt; Settings
        &gt; Manage apps also shows the folder&apos;s size and can delete it.
      </p>
      <p>
        The app&apos;s use of information received from Google APIs adheres to the Google API
        Services User Data Policy, including the Limited Use requirements:{' '}
        <Ext href="https://developers.google.com/terms/api-services-user-data-policy" />
      </p>
      <p>
        Android&apos;s own device backup may copy the app&apos;s item list (not the photos) to your
        Google account, if you have device backup turned on. This is handled by Android, not by us.
      </p>

      <h2>Children</h2>
      <p>The app is not directed at children under 13.</p>

      <h2>Deleting your data</h2>
      <p>
        Delete items in the app, or clear the app&apos;s storage or uninstall it to remove everything
        on the device. If you connected Google Drive, use &quot;Delete cloud data&quot; in Settings
        &gt; Google Drive to remove the copy in your Drive. We hold no copy to delete.
      </p>

      <h2>Changes</h2>
      <p>If this policy changes, the new version will be posted at this address with a new date.</p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </>
  );
}

export default function PrivacyPolicy({ app }: { app: App }) {
  const p = app.policy;
  switch (p.kind) {
    case 'calendar':
      return <CalendarPolicy app={app} settings={p.settings} />;
    case 'lunar':
      return <LunarPolicy app={app} />;
    case 'loan':
      return <LoanPolicy app={app} stored={p.stored} exportFiles={p.exportFiles} />;
    case 'shelfbell':
      return <ShelfbellPolicy />;
  }
}
