import TermsOfService from "../../ui/TermsOfService";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "TermsPage" });

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

export default function Terms() {
  return <TermsOfService />;
}
