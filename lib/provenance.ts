import capture from "@/artifacts/integration/screenshot-receipts.json";

export interface Receipt {
  project: string; file: string; source: string; status: number; title: string;
  viewport: { width: number; height: number }; capturedAt: string; bytes: number; sha256: string;
}

const receipts = capture.receipts as Receipt[];

/** Capture receipts recorded when each screenshot was taken from the deployed site. */
export function receiptsFor(slug: string) { return receipts.filter(receipt => receipt.project === slug); }
export function receiptFor(file: string) { return receipts.find(receipt => receipt.file === file); }
export function captureDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kuala_Lumpur" }).format(new Date(iso));
}
