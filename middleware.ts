import { NextRequest, NextResponse } from "next/server";

export function middleware( request: NextRequest){
    const token = request.cookies.get("token")?.value;
    // Define las rutas protegidas y la ruta de inicio de sesión
    const protectedRoutes = ["/panel",];
    const loginRoute = "/login";

    // const response = NextResponse.next();

    // // Establecer encabezados de caché para las rutas protegidas
    // if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    //     response.headers.set("Cache-Control", "no-store");
    // }


    //Redirige a login si no hay token en una ruta protegida
    if(protectedRoutes.some((route)=> request.nextUrl.pathname.startsWith(route)) && !token ){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Si hay token y el usuario intenta ir a /login, redirige a /dashboard
    if (request.nextUrl.pathname.startsWith(loginRoute) && token) {
        return NextResponse.redirect(new URL("/panel", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/panel/:path*","/login"]
}