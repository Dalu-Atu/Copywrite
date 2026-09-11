/**
 * Central config for the app's use-case landing pages, e.g. /app/meeting-notes-scanner.
 *
 * Every downstream piece reads from this file:
 *  - Step 2 (route/page.js)      -> generateStaticParams() maps over USE_CASES
 *  - Step 3 (translations)       -> `namespace` is the next-intl namespace to look up
 *  - Step 4 (UseCaseLandingPage) -> `iconKey`, `images`, `targetFormat` drive rendering
 *  - Step 5 (metadata/JSON-LD)   -> `faqKeys`, `keyword`, `namespace` build schema + meta
 *
 * iconKey is a STRING, not a component reference, so this file stays plain data
 * (safe to import from both server and client code). The shared component maps
 * these strings to the actual icon components already defined in AppPage.jsx.
 */

export const SUPPORTED_LOCALES = [
  "en",
  "es",
  "tr",
  "zh",
  "hi",
  "de",
  "ja",
  "fr",
  "pt-br",
  "da",
  "fi",
  "it",
  "nl",
  "no",
  "sv",
];

export const USE_CASES = [
  {
    slug: "class-notes-scanner",
    namespace: "ClassNotesScannerPage",
    targetFormat: "word",
    keyword: "class notes scanner app",
    iconKey: "camera",
    images: {
      before: "/images/usecases/class-notes-before.jpg",
      after: "/images/usecases/class-notes-after.jpg",
    },
    faqKeys: [
      "how_it_works",
      "messy_handwriting",
      "lecture_slides_mixed_notes",
      "study_from_converted_notes",
      "free_for_students",
      "multiple_languages",
      "sync_across_devices",
      "accuracy",
    ],
  },
  {
    slug: "letter-scanner",
    namespace: "LetterScannerPage",
    targetFormat: "word",
    keyword: "scan handwritten letters app",
    iconKey: "devices",
    images: {
      before: "/images/usecases/letter-before.jpg",
      after: "/images/usecases/letter-after.jpg",
    },
    faqKeys: [
      "how_it_works",
      "old_faded_letters",
      "cursive_and_old_scripts",
      "preserve_originals",
      "batch_of_letters",
      "family_archive_use",
      "accuracy",
      "privacy_of_personal_letters",
    ],
  },
  {
    slug: "inventory-count-scanner",
    namespace: "InventoryCountScannerPage",
    targetFormat: "excel",
    keyword: "warehouse inventory count app",
    iconKey: "devices",
    images: {
      before: "/images/usecases/inventory-count-before.jpeg",
      after: "/images/usecases/inventory-count-after.jpeg",
    },
    faqKeys: [
      "how_it_works",
      "no_drawn_lines",
      "numeric_accuracy",
      "multiple_sheets_per_day",
      "export_format",
      "team_use",
      "offline_warehouse_use",
      "free_or_paid",
    ],
  },
  {
    slug: "receipt-to-excel-scanner",
    namespace: "ReceiptToExcelScannerPage",
    targetFormat: "excel",
    keyword: "receipt to excel scanner",
    iconKey: "cloud",
    images: {
      before: "/images/usecases/receipt-before.jpg",
      after: "/images/usecases/receipt-after.jpg",
    },
    faqKeys: [
      "how_it_works",
      "faded_receipts",
      "currency_symbols",
      "batch_of_receipts",
      "tax_season_use",
      "export_format",
      "accuracy_on_numbers",
      "privacy_of_financial_data",
    ],
  },
  {
    slug: "log-sheet-scanner",
    namespace: "LogSheetScannerPage",
    targetFormat: "excel",
    keyword: "scan handwritten log sheet to excel",
    iconKey: "bell",
    images: {
      before: "/images/usecases/log-sheet-before.jpg",
      after: "/images/usecases/log-sheet-after.jpg",
    },
    faqKeys: [
      "how_it_works",
      "field_conditions",
      "no_drawn_lines",
      "multiple_columns",
      "daily_logs_batch",
      "export_format",
      "team_use",
      "free_or_paid",
    ],
  },
];

export function getUseCaseBySlug(slug) {
  return USE_CASES.find((useCase) => useCase.slug === slug) ?? null;
}
