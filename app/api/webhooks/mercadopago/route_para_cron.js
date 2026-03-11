import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { createClient } from "../../../lib/supabase/service_role";

export async function POST(request) {
  try {
    const signature = request.headers.get("x-signature");
    const requestId = request.headers.get("x-request-id");
    const body = await request.json();
    const supabase = createClient();

    if (!signature || !requestId) {
      return NextResponse.json({ error: "Missing headers" }, { status: 400 });
    }

    const parts = signature.split(",");
    let ts;
    let xSignature;

    parts.forEach((part) => {
      const [key, value] = part.split("=");
      if (key && value) {
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();
        if (trimmedKey === "ts") {
          ts = trimmedValue;
        } else if (trimmedKey === "v1") {
          xSignature = trimmedValue;
        }
      }
    });

    const manifiest = `id:${body.data.id};request-id:${requestId};ts:${ts};`;

    const hash = createHmac("sha256", process.env.MP_SECRET_KEY_TEST)
      .update(manifiest)
      .digest("hex");

    if (hash !== xSignature) {
      console.log("Error de hash :", hash, ", xSignature:", xSignature);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    console.warn("Webhook válido:", body);
    const received_at =
      body.date_created ?? body.date ?? new Date().toISOString();

    const { error: supabaseError } = await supabase
      .from("webhook_events")
      .upsert(
        {
          mp_event_id: body.data.id,
          mp_notification_id: body.id,
          type: body.type,
          action: body.action,
          raw_body: body,
          status: "pending",
          received_at: received_at,
          attempts: 0,
        },
        { onConflict: "mp_notification_id", ignoreDuplicates: true },
      );
    if (supabaseError) {
      console.error(
        "Error al enviar datos al webhook_event. Este fue el error: ",
        supabaseError,
      );
      return NextResponse.json(
        { error: "Error en supabase:" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Webhook recibido" }, { status: 200 });
  } catch (error) {
    console.error("Error al guardar webhook en la BD:", error);
    return NextResponse.json(
      { error: `Iternal error, description: ${error}` },
      { status: 500 },
    );
  }
}
