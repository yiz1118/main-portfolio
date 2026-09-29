import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([...nextVitals, ...nextTs, globalIgnores([".next/**", ".next-public/**", "test-results/**", "playwright-report/**", "artifacts/**", "next-env.d.ts", "Portfolio website/01 - Premium Restaurant  Fine Dining Website/**", "Portfolio website/04 — Architecture  Luxury Property Website/**", "Portfolio website/05 — Beauty  Skincare  Wellness E-Commerce/**", "Portfolio website/06 — Automotive  Performance Car Website/**"])]);
