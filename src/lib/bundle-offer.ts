/** Saudi Arabia is UTC+3 year-round. */
export const BUNDLE_OFFER_NAME = "The Black Friday Deal";
export const BUNDLE_OFFER_START_ISO = "2026-11-14T13:00:00.000Z";
export const BUNDLE_OFFER_END_ISO = "2026-11-21T13:00:00.000Z";
export const BUNDLE_OFFER_START_MS = Date.parse(BUNDLE_OFFER_START_ISO);
export const BUNDLE_OFFER_END_MS = Date.parse(BUNDLE_OFFER_END_ISO);

export type BundleOfferPhase = "upcoming" | "active" | "ended";

const REGION_TIME_ZONES: Record<
  string,
  { timeZone: string; label: string; shortLabel: string }
> = {
  US: { timeZone: "America/New_York", label: "Eastern Time", shortLabel: "ET" },
  ES: { timeZone: "Europe/Madrid", label: "Central European Time", shortLabel: "CET" },
  FR: { timeZone: "Europe/Paris", label: "Central European Time", shortLabel: "CET" },
  GB: { timeZone: "Europe/London", label: "UK time", shortLabel: "UK time" },
  CA: { timeZone: "America/Toronto", label: "Eastern Time", shortLabel: "ET" },
};

function normalizeIntlSpaces(value: string) {
  return value.replace(/[\u202f\u2009]/g, " ");
}

function formatOfferDateTime(iso: string, timeZone: string) {
  return normalizeIntlSpaces(
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    }).format(new Date(iso)),
  );
}

function formatOfferTime(iso: string, timeZone: string) {
  return normalizeIntlSpaces(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    }).format(new Date(iso)),
  );
}

/** Convert the fixed offer window into the shopper's selected regional time. */
export function getBundleOfferCopy(regionCode: string) {
  const zone = REGION_TIME_ZONES[regionCode] ?? REGION_TIME_ZONES["US"]!;
  const start = `${formatOfferDateTime(BUNDLE_OFFER_START_ISO, zone.timeZone)} ${zone.label}`;
  const end = `${formatOfferDateTime(BUNDLE_OFFER_END_ISO, zone.timeZone)} ${zone.label}`;

  return {
    start,
    end,
    starts: `Starts ${start}`,
    ends: `Ends ${end}`,
    ended: `The offer ended ${end}`,
    availableAt: `Available at ${formatOfferTime(BUNDLE_OFFER_START_ISO, zone.timeZone)} ${zone.shortLabel}`,
    timeZoneLabel: zone.label,
  };
}

export function getBundleOfferPhase(now: number): BundleOfferPhase {
  if (now < BUNDLE_OFFER_START_MS) return "upcoming";
  if (now < BUNDLE_OFFER_END_MS) return "active";
  return "ended";
}

export function getBundleCountdown(now: number, target: number) {
  const totalSeconds = Math.max(0, Math.floor((target - now) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
