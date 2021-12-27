import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

export enum Version {
  mobile,
  desktop,
}

const getVersion = (): Version => (document.body.clientWidth < 1024 ? Version.mobile : Version.desktop);

export const useResize = (): { version: Version } => {
  const [version, setVersion] = useState(getVersion());
  const handleResize = throttle(() => {
    setVersion(getVersion());
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { version };
};
