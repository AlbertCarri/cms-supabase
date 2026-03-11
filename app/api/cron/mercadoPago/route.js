import { NextResponse, NextRequest } from "next/server";
import { createClient } from "../../../lib/supabase/service_role";

export async function POST(request) {
  try {
    if (
      request.headers.get("Authorization") !==
      `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ end: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("webhook_events")
      .select("*")
      .eq("status", "pending")
      .limit(10);

    if (error) {
      console.error("Error fetching pending events:", error);
      return NextResponse.json(
        { error: "Error fetching pending events" },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
