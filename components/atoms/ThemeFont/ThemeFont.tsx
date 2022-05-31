import * as React from "react";

import { useThemeFontQuery } from "./queries.graphql.generated";

interface IThemeFontProps {
  fontName?: string;
}

export const ThemeFont: React.FC<IThemeFontProps> = () => {
  const { data, loading } = useThemeFontQuery({
    variables: { name: "ThemeFont" },
  });

  function generateLinkUrl(name: string) {
    const fontNameString = name.replace(" ", "+");
    const fontString =
      "https://fonts.googleapis.com/css?family=FONTNAME:400,600,700,900&display=swap";
    return fontString.replace("FONTNAME", fontNameString);
  }

  function getNameFromQuery(value: typeof data): string {
    const json = value?.designerdata?.jsonContent ?? "";
    return json ? JSON.parse(json).name : "";
  }

  const fontNameFromQuery = getNameFromQuery(data);
  return (
    <>
      {loading ? (
        ""
      ) : (
        <>
          <link
            href={generateLinkUrl(fontNameFromQuery)}
            rel="stylesheet"
          ></link>
          <style type="text/css">
            {`
                            * {
                                font-family: ${fontNameFromQuery};
                            }
                        `}
          </style>
        </>
      )}
    </>
  );
};
