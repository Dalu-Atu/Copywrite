import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/config"; // Point to the NEW light file

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(en|tr|es|pt-br|zh|hi|fi|it|nl|no|sv|da|fr|de|ja)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
