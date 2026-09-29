export type AnalyticsEvent =
  | { name: "page_view"; path: string }
  | { name: "cta_click"; label: string; destination: string }
  | { name: "project_view"; slug: string }
  | { name: "contact_accepted" };
type AnalyticsSink = (event: AnalyticsEvent) => void;
let sink: AnalyticsSink | undefined;
/** Optional future adapter. No tracking or network requests occur by default. */
export function configureAnalytics(adapter: AnalyticsSink) { sink = adapter; }
export function track(event: AnalyticsEvent) { sink?.(event); }
