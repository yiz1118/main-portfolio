import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
export const alt = "Alson Chua — Independent Web & App Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function SocialImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f8f8f5", padding: "65px 75px", color: "#191c20", fontFamily: "sans-serif" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, color: "#5f6369" }}><div>{site.name}</div><div>{site.title}</div></div><div style={{ display: "flex", flexDirection: "column", fontSize: 78, lineHeight: 1.08, letterSpacing: -4, marginTop: 50 }}><div>Ideas into</div><div style={{ color: "#2348d4" }}>real products.</div></div><div style={{ display: "flex", marginTop: "auto", borderTop: "1px solid #dcded8", paddingTop: 24, fontSize: 20, justifyContent: "space-between" }}><div>Websites · E-Commerce · Apps · AI products</div><div>Malaysia / Worldwide</div></div></div>, size);
}
