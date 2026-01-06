import PrivacyPolicy from "../../ui/PrivacyPolicy";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "PrivacyPage" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    openGraph: {
      title: t("meta_title"),
      description: t("meta_desc"),
      type: "website",
    },
  };
}

export default function Privacy() {
  return <PrivacyPolicy />;
}
