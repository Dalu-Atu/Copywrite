"use client"; // <--- This is crucial

import { usePathname } from "next/navigation";
import HeaderComponent from "./HeaderComponent";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // List of routes where you want to hide Header and Footer
  const excludedRoutes = ["/login", "/signup", "/register", "/auth/login"];

  // Check if current path is in the excluded list
  const shouldHideLayout = excludedRoutes.includes(pathname);

  return (
    <>
      {!shouldHideLayout && <HeaderComponent />}
      <main className="min-h-screen">{children}</main>
      {!shouldHideLayout && <Footer />}
    </>
  );
}
