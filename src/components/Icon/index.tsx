// React, redux
import { FC, useRef } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

// Hooks
import { useDragNDrop } from 'src/hooks/useDragNDrop';

// Types
import { Apps } from 'src/types/apps';
import { CoordsType } from 'src/types/coord';

// Styles
import styles from './style.module.css';

type PropsType = {
  imgSource: string;
  handleClick: () => void;
  title: Apps;
  topCoord: string;
  leftCoord: string;
  changeCoord: ActionCreatorWithPayload<CoordsType, string>;
  children?: never;
};

export const Icon: FC<PropsType> = ({ imgSource, handleClick, title, topCoord, leftCoord, changeCoord }: PropsType) => {
  const icon = useRef<HTMLDivElement>(null);

  const { startDrag, topCoordLocal, leftCoordLocal } = useDragNDrop(changeCoord, icon, topCoord, leftCoord);

  return (
    <div className={styles.container} style={{ top: topCoordLocal, left: leftCoordLocal }} ref={icon} data-cy={`icon-${title}`}>
      <div onDoubleClick={handleClick} className={styles.imgContainer} onMouseDown={startDrag}>
        <img src={imgSource} alt="" className={`${styles.img}`} />
      </div>
      <span className={styles.title}>{title}</span>
    </div>
  );
};
