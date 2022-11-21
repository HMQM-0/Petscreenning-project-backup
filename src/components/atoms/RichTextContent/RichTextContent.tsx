import draftToHtml from "draftjs-to-html";
import React, { useEffect } from "react";
import xss from "xss";

import { IProps } from "./types";

export const RichTextContent: React.FC<IProps> = ({ descriptionJson }) => {
  useEffect(() => {
    console.log(draftToHtml(JSON.parse(descriptionJson)));
  }, [descriptionJson]);

  return (
    <>
      {descriptionJson && (
        <div
          dangerouslySetInnerHTML={{
            __html: xss(draftToHtml(JSON.parse(descriptionJson))),
          }}
        />
      )}
    </>
  );
};
