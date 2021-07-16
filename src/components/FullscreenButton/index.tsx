// React, redux
import { FC, useLayoutEffect, useState } from 'react';

// Styles
import styles from './style.module.css';

type PropsType = {
  children?: never;
};

export const FullscreenButton: FC<PropsType> = () => {
  const [isFullscreen, setIsFullscreen] = useState<Boolean>(false);

  useLayoutEffect(() => {
    const toggleFullscreen = () => {
      setIsFullscreen((prevState) => !prevState);
    };

    document.addEventListener('fullscreenchange', toggleFullscreen);
    return () => document.removeEventListener('fullscreenchange', toggleFullscreen);
  }, []);

  // Handlers
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={handleFullscreen} id="fullscreen-btn" className={styles.fullscreenButtonContainer}>
      <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'} ${styles.fullscreenButton}`} />
    </div>
  );
};
