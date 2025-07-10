import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { apiAuthPrefix, authRoutes, loginRedirect, publicRoutes } from "./routes"
import { NextResponse } from "next/server"
 
const { auth: middleware } = NextAuth(authConfig)
export default middleware((req)=>{
    const {nextUrl} = req
    const isLogged = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute)return
    if(isAuthRoute) {
        if(isLogged)return NextResponse.redirect(new URL(loginRedirect, nextUrl))
        return
    }
    if(!isLogged && !isPublicRoute) return NextResponse.redirect(new URL("/login", nextUrl))
    return

})
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}