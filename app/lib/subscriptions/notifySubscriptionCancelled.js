import { getUserData } from "../supabase/getUserData";
import { sendEmail } from "../resend/sendEmail";
import { buildMailCancelledTemplete } from "./buildMailCancelledTemplate";
import { createClient } from "../supabase/service_role";

export async function notifySubscriptionCancelled({ userId, subscriptionEnd }) {
  try {
    const supabase = createClient();
    const to = await getUserData(userId);
    if (!to) return { success: false };

    const { data: alreadySent } = await supabase
      .from("email_logs")
      .select("id")
      .eq("user_id", userId)
      .eq("email_type", "cancelled_user")
      .maybeSingle();

    if (alreadySent) {
      console.log(
        `Email de cancelación ya enviado al usuario ${userId}, no se enviará nuevamente.`,
      );
      return { success: false, error: "Email de activación ya enviado" };
    }

    const { subject, html } = buildMailCancelledTemplete(subscriptionEnd);

    const response = await sendEmail({
      from: "TuResto <noreply@edelbyte.com.ar>",
      to,
      subject,
      html,
    });
    if (!response.success) {
      console.error(
        "Error al enviar el email de cancelación al usuario: ",
        userId,
        ", error:",
        response.error,
      );
      return { success: false, error: response.error };
    }

    const { error } = await supabase.from("email_logs").insert({
      user_id: userId,
      email_type: "cancelled_user",
      sent_at: new Date(),
    });
    if (error) {
      console.error("Error de escritura de email_logs. Detalles:", error);
      return { success: false, error: error };
    }

    return { success: true, message: response.id };
  } catch (err) {
    console.error("Error al intententar enviar mail de cancelled");
    return { success: false, error: err };
  }
}
