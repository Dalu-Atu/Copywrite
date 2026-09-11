"use client";

import { useTranslations } from "next-intl";
import { USE_CASES } from "./app-usecases-config";
import { Reveal, ICONS_BY_KEY } from "./AppShared";

export default function ExploreByUseCase({ locale }) {
  const t = useTranslations("AppPage");
  const tRoot = useTranslations();
  const localePath = locale === "en" ? "" : `/${locale}`;

  return (
    <section id="explore-use-cases" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            {t("explore_usecases_title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-lg">
            {t("explore_usecases_subtitle")}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {USE_CASES.map((useCase, i) => {
            const Icon = ICONS_BY_KEY[useCase.iconKey];
            return (
              <Reveal key={useCase.slug} delay={i * 60}>
                <a
                  href={`${localePath}/app/${useCase.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 p-5 transition-colors hover:border-[#34D399]/60 hover:bg-[#15191F] sm:p-6"
                >
                  {Icon && <Icon className="h-8 w-8 text-[#E3B23C]" />}
                  <span className="text-base font-medium text-[#F4F1EA] transition-colors group-hover:text-[#34D399]">
                    {tRoot(`${useCase.namespace}.nav_label`)}
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
