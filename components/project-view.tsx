"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
export function ProjectView({ slug }: { slug: string }) { useEffect(() => { track({ name: "project_view", slug }); }, [slug]); return null; }
