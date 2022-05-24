export const formatDate = (date: string | null | undefined) => {
  if (!date) {
    return null;
  }
  const tempDate = new Date(date);
  // TODO: Wtf is going on here?
  const newTempDate = tempDate.toString().split(" ").splice(1, 3);
  newTempDate[1] += ",";
  return newTempDate.join(" ");
};

// This function takes in a string that might have HTML Entity Encoding and Decodes it
export const decodeEntities = (() => {
  if (typeof window === 'undefined') {
    // TODO: Tmp fix for SSR until we find out
    //  why this helper function was needed in the first place
    return (str: any) => str;
  }

  const element = document.createElement("div");

  function decodeHTMLEntities(str: string | null | undefined) {
    if (!str) {
      return null;
    }

    // TODO: What's going on here??
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
    element.innerHTML = str as string;
    str = element.textContent;
    element.textContent = "";
    return str;
  }

  return decodeHTMLEntities;
})();
