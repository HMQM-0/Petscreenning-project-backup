import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";

export enum Locale {
  EN = "en",
  PL = "pl",
  AR = "ar",
  AZ = "az",
  BG = "bg",
  BN = "bn",
  CA = "ca",
  CS = "cs",
  DA = "da",
  DE = "de",
  EL = "el",
  ES = "es",
  ES_CO = "es_CO",
  ET = "et",
  FA = "fa",
  FI = "fi",
  FR = "fr",
  HI = "hi",
  HU = "hu",
  HY = "hy",
  ID = "id",
  IS = "is",
  IT = "it",
  JA = "ja",
  KO = "ko",
  LT = "lt",
  MN = "mn",
  NB = "nb",
  NL = "nl",
  PT = "pt",
  PT_BR = "pt_BR",
  RO = "ro",
  RU = "ru",
  SK = "sk",
  SL = "sl",
  SQ = "sq",
  SR = "sr",
  SV = "sv",
  TH = "th",
  TR = "tr",
  UK = "uk",
  VI = "vi",
  ZH_HANS = "zh-Hans",
  ZH_HANT = "zh-Hant",
}

interface StructuredMessage {
  context?: string;
  string: string;
}
type LocaleMessages = Record<string, StructuredMessage>;

export const localeNames: Record<Locale, string> = {
  [Locale.AR]: "العربيّة",
  [Locale.AZ]: "Azərbaycanca",
  [Locale.BG]: "български",
  [Locale.BN]: "বাংলা",
  [Locale.CA]: "català",
  [Locale.CS]: "česky",
  [Locale.DA]: "dansk",
  [Locale.DE]: "Deutsch",
  [Locale.EL]: "Ελληνικά",
  [Locale.EN]: "English",
  [Locale.ES]: "español",
  [Locale.ES_CO]: "español de Colombia",
  [Locale.ET]: "eesti",
  [Locale.FA]: "فارسی",
  [Locale.FI]: "suomi",
  [Locale.FR]: "français",
  [Locale.HI]: "Hindi",
  [Locale.HU]: "Magyar",
  [Locale.HY]: "հայերեն",
  [Locale.ID]: "Bahasa Indonesia",
  [Locale.IS]: "Íslenska",
  [Locale.LT]: "lietuvių",
  [Locale.IT]: "italiano",
  [Locale.JA]: "日本語",
  [Locale.KO]: "한국어",
  [Locale.MN]: "Mongolian",
  [Locale.NB]: "norsk (bokmål)",
  [Locale.NL]: "Nederlands",
  [Locale.PL]: "polski",
  [Locale.PT]: "Português",
  [Locale.PT_BR]: "Português Brasileiro",
  [Locale.RO]: "Română",
  [Locale.RU]: "Русский",
  [Locale.SK]: "Slovensky",
  [Locale.SL]: "Slovenščina",
  [Locale.SQ]: "shqip",
  [Locale.SR]: "српски",
  [Locale.SV]: "svenska",
  [Locale.TH]: "ภาษาไทย",
  [Locale.TR]: "Türkçe",
  [Locale.UK]: "Українська",
  [Locale.VI]: "Tiếng Việt",
  [Locale.ZH_HANS]: "简体中文",
  [Locale.ZH_HANT]: "繁體中文",
};

const dotSeparator = "_dot_";
const sepRegExp = new RegExp(dotSeparator, "g");

async function getKeyValueJson(locale: Locale): Promise<Record<string, string>> {
  let messages: LocaleMessages = {};
  try {
    messages = await import(`../../../config/locale/${locale}.json`);
  } catch {
    console.error(`Unable to find locale data for ${locale}.`);
  }
  const keyValueMessages: Record<string, string> = {};
  return Object.entries(messages).reduce((acc, [id, msg]) => {
    acc[id.replace(sepRegExp, ".")] = msg.string;
    return acc;
  }, keyValueMessages);
}

const defaultLocale = Locale.EN;

interface LocaleProviderProps {
  children: React.ReactNode;
  changeLocale?(lang: Locale): void;
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({ children, changeLocale }) => {
  const [locale] = React.useState<Locale>(Locale.EN);
  const [messages, setMessages] = React.useState({});

  useEffect(() => {
    const getMessages = async () => {
      const newMessages = await getKeyValueJson(locale);
      setMessages(newMessages);
    };
    getMessages();
  }, [locale]);

  return (
    <IntlProvider
      defaultLocale={defaultLocale}
      locale={locale}
      messages={messages}
      key={locale}
    >
      {children}
    </IntlProvider>
  );
};

export { LocaleProvider };
export default LocaleProvider;
