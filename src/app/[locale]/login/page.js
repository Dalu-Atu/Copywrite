import LoginPage from "../../ui/LoginPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Login" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: {
      canonical: `https://copywritee.com/${locale}/login`,
    },
  };
}

export default function page() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}
