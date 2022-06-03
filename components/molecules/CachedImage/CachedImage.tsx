import React from "react";

import { PlaceholderImage } from "components/atoms/PlaceholderImage";
import { useNetworkStatus } from "@hooks";
import { IImage } from "@types";

export const CachedImage = ({
  url,
  url2x,
  alt,
  children,
  height,
  width,
  ...props
}: IImage) => {
  const [isUnavailable, setUnavailable] = React.useState(false);
  const { online } = useNetworkStatus();

  React.useEffect(() => {
    // TODO: Does not work as expected. Infinite re-render is happening
    // async function updateAvailability() {
    //   let _isUnavailable = false;
    //   if ("caches" in window) {
    //     if (!online) {
    //       const match = await window.caches.match(url!);
    //       let match2x;
    //       if (url2x) {
    //         match2x = await window.caches.match(url2x);
    //       }
    //       if (!match && !match2x) {
    //         _isUnavailable = true;
    //       }
    //     }
    //   }
    //
    //   if (isUnavailable !== _isUnavailable) {
    //     setUnavailable(_isUnavailable);
    //   }
    // }
    //
    // updateAvailability();
  }, [isUnavailable, online, url, url2x]);

  if (!url || isUnavailable) {
    return children || (<PlaceholderImage alt={alt} />);
  }

  return (
    // TODO: <Image ...> does not support srcSet. Refactoring required
    // eslint-disable-next-line
    <img
      {...props}
      src={url}
      srcSet={url2x ? `${url} 1x, ${url2x} 2x` : `${url} 1x`}
      alt={alt}
      height={height}
      width={width}
      // navigator.onLine is not always accurate
      onError={() => setUnavailable(true)}
    />
  );
};
