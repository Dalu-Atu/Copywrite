import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Update the middle group to include all your locale codes
  matcher: [
    "/",
    "/(en|tr|es|pt-br|zh|hi|fi|it|nl|no|sv|da|fr|de|ja)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
