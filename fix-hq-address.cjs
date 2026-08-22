/**
 * fix-hq-address.js
 *
 * Updates messages.ContactPage.sidebar.hq_address (and optionally hq_title)
 * across ALL locale JSON files at once — by KEY PATH, not by text matching.
 * This works even though each language has a different translated string
 * (Zürich, Zurigo, Zürih, ज़्यूरिख़, etc.) because we don't care what the
 * old text says, we just overwrite whatever is sitting at that key.
 *
 * USAGE:
 *   1. Put this file in your project root (same level as your locales folder).
 *   2. Edit LOCALES_DIR below to point at the folder containing en.json, de.json, etc.
 *   3. Edit NEW_ADDRESS / NEW_COMPANY_LINE below.
 *   4. Run:  node fix-hq-address.js
 *   5. Check `git diff` before committing — always review automated edits.
 */

const fs = require("fs");
const path = require("path");

// ---- CONFIGURE THESE ----
const LOCALES_DIR = "./messages"; // <-- change to your actual locales folder path
const NEW_ADDRESS = "NoteOCR\n11 Boyo Road, Sapele, Delta State\nNigeria";

// Optional: only fill these in if you also want hq_title updated per language.
// Leave a locale out (or leave the map empty) to skip changing hq_title for it.
const NEW_TITLE_BY_LOCALE = {
  en: "Headquarters",
  da: "Hovedkontor",
  de: "Hauptsitz",
  es: "Sede Central",
  fi: "Pääkonttori",
  fr: "Siège Social",
  hi: "मुख्यालय",
  it: "Sede Centrale",
  ja: "本社",
  nl: "Hoofdkantoor",
  no: "Hovedkontor",
  "pt-br": "Sede",
  sv: "Huvudkontor",
  tr: "Genel Merkez",
  zh: "总部",
};
// ---------------------------

function setAtPath(obj, keys, value) {
  let node = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (node[keys[i]] === undefined) return false; // path doesn't exist, skip safely
    node = node[keys[i]];
  }
  const lastKey = keys[keys.length - 1];
  if (node[lastKey] === undefined) return false;
  node[lastKey] = value;
  return true;
}

function main() {
  const files = fs.readdirSync(LOCALES_DIR).filter((f) => f.endsWith(".json"));

  if (files.length === 0) {
    console.error(`No .json files found in ${LOCALES_DIR}. Check the path.`);
    process.exit(1);
  }

  let changed = 0;

  for (const file of files) {
    const fullPath = path.join(LOCALES_DIR, file);
    const localeCode = path.basename(file, ".json");
    const raw = fs.readFileSync(fullPath, "utf8");

    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error(`✗ ${file}: invalid JSON, skipped (${e.message})`);
      continue;
    }

    const addressPath = ["ContactPage", "sidebar", "hq_address"];
    const titlePath = ["ContactPage", "sidebar", "hq_title"];

    const addressUpdated = setAtPath(data, addressPath, NEW_ADDRESS);

    let titleUpdated = false;
    if (NEW_TITLE_BY_LOCALE[localeCode]) {
      titleUpdated = setAtPath(
        data,
        titlePath,
        NEW_TITLE_BY_LOCALE[localeCode],
      );
    }

    if (!addressUpdated) {
      console.warn(`⚠ ${file}: hq_address path not found, skipped`);
      continue;
    }

    // Preserve 2-space indentation to match your existing file style
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + "\n", "utf8");
    changed++;
    console.log(
      `✓ ${file}: hq_address updated${
        titleUpdated ? ", hq_title updated" : ""
      }`,
    );
  }

  console.log(`\nDone. ${changed}/${files.length} files updated.`);
  console.log("Run `git diff` to review before committing.");
}

main();
