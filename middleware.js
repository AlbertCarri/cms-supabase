import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // 🔒 Rutas que REQUIEREN autenticación
  const protectedRoutes = ["/main", "/onboarding"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );

  // ✅ Rutas públicas (NO requieren autenticación)
  const publicRoutes = ["/auth", "/menu"];
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  // Sin usuario intentando acceder a ruta protegida → /login
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Con usuario en /login → /main (ya está logueado)
  if (user && path === "/auth/login") {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
