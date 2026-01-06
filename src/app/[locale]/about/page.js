import AboutPage from "../../ui/AboutPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    openGraph: {
      title: t("meta_title"),
      description: t("meta_desc"),
    },
  };
}

export default function About() {
  return <AboutPage />;
}
