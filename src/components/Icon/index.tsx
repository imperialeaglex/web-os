// Libraries
import { FC, useRef } from 'react';
import { useSelector } from 'react-redux';

// Redux
import { changeIconPos } from 'src/redux/slices/appsSlice';

// I18n
import { useTranslation } from 'react-i18next';
import 'src/features/i18n';

// Hooks
import { useDragNDrop } from 'src/hooks/useDragNDrop';
import { useApp } from 'src/hooks/useApp';

// Types
import { Apps } from 'src/types/apps';
import { RootState } from 'src/redux/store';

// Styles
import styles from './style.module.css';

interface Props {
  imgSource: string;
  type: Apps;
  children?: never;
}

export const Icon: FC<Props> = ({ imgSource, type }: Props) => {
  const iconCoords = useSelector((state: RootState) => state.apps.appsState[type].iconPos);

  const icon = useRef<HTMLDivElement>(null);

  const { startDrag, newCoords } = useDragNDrop(changeIconPos, icon, iconCoords, type);
  const { t } = useTranslation();
  const { handleOpen } = useApp(type);

  return (
    <div
      className={styles.container}
      style={{ top: newCoords?.top, left: newCoords?.left }}
      ref={icon}
      data-cy={`icon-${type}`}
    >
      <button
        type="button"
        onDoubleClick={handleOpen}
        className={styles.imgContainer}
        onMouseDown={startDrag}
        aria-label={`${type} icon`}
      >
        <img src={imgSource} alt="" className={`${styles.img}`} />
      </button>
      <span className={styles.title}>{t(`apps.${type}`)}</span>
    </div>
  );
};
