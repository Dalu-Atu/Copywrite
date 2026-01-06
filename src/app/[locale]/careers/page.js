import CareerPage from "../../ui/CareersPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "CareersPage" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const Career = () => {
  return <CareerPage />;
};

export default Career;
