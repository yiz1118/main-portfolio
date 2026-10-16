import { ImageResponse } from "next/og";
import { processSteps } from "@/data/services";
import { site } from "@/lib/site";
export const alt = "Alson Chua — Independent Web & App Developer. Discover, design, build, test, launch: every stage by one developer.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function SocialImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", background: "#f2f1ec", padding: "56px 64px", color: "#151413", fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
      {processSteps.map(step => <div key={step.title} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: "1px solid #b3afa4", padding: "4px 0 6px", fontSize: 74, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}><span>{step.title}</span><span style={{ fontSize: 22, fontWeight: 400, fontStyle: "italic", letterSpacing: 0, color: "#5e5c57" }}>{site.name}</span></div>)}
    </div>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginLeft: "auto", alignItems: "flex-end" }}>
      <svg width="120" height="120" viewBox="0 0 40 40"><rect width="40" height="40" fill="#cf3a1e" /><rect x="3.2" y="3.2" width="33.6" height="33.6" fill="none" stroke="#f2f1ec" strokeWidth="1.2" /><path fill="#f2f1ec" fillRule="evenodd" d="M7.4 31 12.2 9h4.1l4.8 22h-3.5l-.95-4.6h-4.84L10.9 31H7.4Zm5.1-7.7h3.6L14.3 14.6l-1.8 8.7ZM33 9H23v22h10v-3.3h-6.5V12.3H33V9Z" /></svg>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontSize: 24, color: "#5e5c57" }}><span style={{ color: "#151413", fontSize: 30, fontWeight: 700 }}>{site.name}</span><span>{site.title}</span><span>Malaysia · working worldwide</span></div>
    </div>
  </div>, size);
}
