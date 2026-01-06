import SignupPage from "../../ui/SignuPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Signup" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: {
      canonical: `https://copywritee.com/${locale}/signup`,
    },
  };
}

export default function page() {
  return (
    <div>
      <SignupPage />
    </div>
  );
}
