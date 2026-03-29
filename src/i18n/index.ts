import en from "./locales/en.json";

const locales = {
  en,
};

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

const createTranslation = (locale: keyof typeof locales) => {
  if (!locale || !locales[locale]) {
    throw new Error("Locale not found");
  }

  const currentLocale = locales[locale];

  return (key: NestedKeyOf<typeof currentLocale>) => {
    const keys = key.split(".");
    let result: unknown = currentLocale;
    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k as keyof typeof result];
      } else {
        return key;
      }
    }
    return result as string;
  };
};

export const t = createTranslation("en");
