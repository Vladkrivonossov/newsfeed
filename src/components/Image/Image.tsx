import React, { CSSProperties, FC, ImgHTMLAttributes, useMemo, useState } from 'react';
import classNames from 'classnames';
import './Image.css';
import { TArticleImage, TExtendedImage } from '@features/articleItem/types';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src?: string;
  skeleton?: boolean;
  data?: TExtendedImage;
  maxWidth?: number;
  alt?: string;
  autoHeight?: boolean;
}

type TExtendedVariant = TArticleImage & {
  media: string;
};

export const Image: FC<ImageProps> = ({
  autoHeight = true,
  className,
  maxWidth = Number.POSITIVE_INFINITY,
  alt,
  onLoad,
  src = '',
  data,
  skeleton = false,
  ...restProps
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const hasImage = src?.length > 0 || (data && data?.source.length > 0);

  const imageSrc = useMemo(() => {
    return src || data?.source;
  }, [src, data]);

  const variants: TExtendedVariant[] = useMemo(() => {
    if (!data) {
      return [];
    }

    const variants = data.variants.concat([]).filter((v) => v.width <= maxWidth);
    variants.sort((a, b) => {
      if (a.width === b.width) {
        return a.format < b.format ? 1 : -1;
      }
      return a.width - b.width;
    });

    const lastType = variants.length && variants[variants.length - 1].type;

    return variants.map<TExtendedVariant>((v) => {
      return {
        ...v,
        media: v.type === lastType ? 'all' : `(max-width: ${v.width}px)`,
      };
    });
  }, [data, maxWidth]);

  const style = useMemo(() => {
    const style: Record<string, CSSProperties> = {};

    if (autoHeight && data && data.variants.length) {
      style['--image-container-height'] = ((100 * variants[0].height) / variants[0].width + 'vw') as CSSProperties;
    }

    if (data?.stripped) {
      style['backgroundImage'] = `url(${data.stripped.url})` as CSSProperties;
    }

    return style;
  }, [data, autoHeight]);

  return (
    <div
      style={style}
      className={classNames(
        'image',
        {
          'image--bg': !!style.backgroundImage,
          'image--loaded': loaded,
          'skeleton-gradient': !style.backgroundImage && (skeleton || (src.length > 0 && !loaded)),
        },
        className
      )}
    >
      {hasImage ? (
        <picture>
          {variants.map((v, index) => {
            return <source key={index} type={`image/${v.format}`} srcSet={v.url} media={v.media} />;
          })}
          <img
            {...restProps}
            className="image__element"
            onLoad={(e) => {
              setLoaded(true);
              onLoad && onLoad(e);
            }}
            src={imageSrc}
            alt={alt || ''}
          />
        </picture>
      ) : null}
    </div>
  );
};
