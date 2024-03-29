import React from "react";
import { useInView } from "react-intersection-observer";

import { Icon } from "src/components/atoms/Icon";
import { CachedImage } from "src/components/molecules/CachedImage";

import * as S from "./styles";
import { IProps } from "./types";

const MINIMAL_NUMBER_OF_IMAGES_FOR_BUTTONS = 4;

export const ProductGallery = ({ images }: IProps) => {
  const [imageIndex, setImageIndex] = React.useState<number>(0);

  const displayButtons = images.length > MINIMAL_NUMBER_OF_IMAGES_FOR_BUTTONS;

  React.useEffect(() => {
    if (imageIndex >= images.length) {
      setImageIndex(0);
    }
  }, [images, imageIndex]);

  const bottomImageRef = React.useRef<HTMLDivElement | null>(null);
  const topImageRef = React.useRef<HTMLDivElement | null>(null);
  const [topImageIntersectionObserver, topImageInView] = useInView({
    threshold: 0.5,
  });

  const [bottomImageIntersectionObserver, bottomImageInView] = useInView({
    threshold: 0.5,
  });

  const setBottomRef = React.useCallback(
    (node: HTMLDivElement) => {
      bottomImageRef.current = node;
      bottomImageIntersectionObserver(node);
    },
    [bottomImageIntersectionObserver],
  );

  const setTopRef = React.useCallback(
    (node: HTMLDivElement) => {
      topImageRef.current = node;
      topImageIntersectionObserver(node);
    },
    [topImageIntersectionObserver],
  );

  const setIntersectionObserver = (index: number, lengthOfArray: number) => {
    if (lengthOfArray > MINIMAL_NUMBER_OF_IMAGES_FOR_BUTTONS) {
      if (index === 0) {
        return setTopRef;
      }
      if (index === lengthOfArray - 1) {
        return setBottomRef;
      }
    }
  };

  return (
    <S.Wrapper data-test="productPhotosGallery">
      <S.ThumbnailsContainer>
        {!topImageInView && displayButtons && (
          <S.TopButton
            onClick={() => {
              if (topImageRef.current) {
                topImageRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                  inline: "nearest",
                });
              }
            }}
          >
            <Icon
              name="select_arrow"
              size={10}
            />
          </S.TopButton>
        )}
        {!bottomImageInView && displayButtons && (
          <S.BottomButton
            onClick={() => {
              if (bottomImageRef.current) {
                bottomImageRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                  inline: "nearest",
                });
              }
            }}
          >
            <Icon
              name="select_arrow"
              size={10}
            />
          </S.BottomButton>
        )}
        <S.ThumbnailList>
          <ul>
            {images.map((image, index) => {
              return (
                <li
                  key={index}
                  data-test="galleryThumbnail"
                  data-test-id={index}
                >
                  <S.Thumbnail
                    ref={setIntersectionObserver(index, images.length)}
                    onClick={() => setImageIndex(index)}
                    onMouseEnter={() => setImageIndex(index)}
                    activeThumbnail={Boolean(index === imageIndex)}
                  >
                    <CachedImage
                      alt={image.alt}
                      url={image.url}
                    />
                  </S.Thumbnail>
                </li>
              );
            })}
          </ul>
        </S.ThumbnailList>
      </S.ThumbnailsContainer>

      <S.Preview data-test="imagePreview">
        {images && images.length > 0 && imageIndex < images.length && (
          <CachedImage
            alt={images[imageIndex].alt}
            url={images[imageIndex].url}
            style={{ maxHeight: 560 }}
          />
        )}
        {images.length === 0 && <CachedImage />}
      </S.Preview>
    </S.Wrapper>
  );
};
