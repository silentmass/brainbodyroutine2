import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnTaskCategories = nextUrl.pathname.startsWith('/task-categories');
            const isOnTasks = nextUrl.pathname.startsWith('/tasks')
            // if (isOnTaskCategories) {
            //     if(isLoggedIn) return true;
            //     return false;
            // } else if (isLoggedIn) {
            //     // return Response.redirect(new URL('/', nextUrl));
            //     return true
            // }
            return true
        },
    },
    providers: [],
} satisfies NextAuthConfig;