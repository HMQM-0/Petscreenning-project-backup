export const formatDate = (date: string | null | undefined) => {
  if (!date) {
    return null;
  }
  const dateObj = new Date(date);
  // Return date in medium locale format. E.g. `May 31, 2022` for En-us.
  return dateObj.toLocaleDateString(undefined, { dateStyle: "medium" });
};

// This function takes in a string that might have HTML Entity Encoding and Decodes it
export const decodeEntities = (() => {
  if (typeof window === "undefined") {
    // Tmp fix for SSR until refactored using some 3rd party library
    return (str: any) => str;
  }

  const element = document.createElement("div");

  function decodeHTMLEntities(str: string | null | undefined) {
    if (!str) {
      return null;
    }

    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
    element.innerHTML = str as string;
    str = element.textContent;
    element.textContent = "";
    return str;
  }

  return decodeHTMLEntities;
})();
