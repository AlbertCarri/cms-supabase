export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Siempre va a update-password después de reset
      return NextResponse.redirect(`${origin}/auth/update-password`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/reset-password?error=link_invalido`);
}