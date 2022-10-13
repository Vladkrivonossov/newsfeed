import React, { FC, ImgHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import './Image.css';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src?: string;
  skeleton?: boolean;
}

export const Image: FC<ImageProps> = ({ className, onLoad, src = '', skeleton = false, ...restProps }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div
      className={classNames(
        'image',
        {
          'image--loaded': loaded,
          'skeleton-gradient': skeleton || (src.length > 0 && !loaded),
        },
        className
      )}
    >
      {src.length ? (
        <img
          {...restProps}
          className="image__element"
          onLoad={(e) => {
            setLoaded(true);
            onLoad && onLoad(e);
          }}
          src={src}
          alt={''}
        />
      ) : null}
    </div>
  );
};
