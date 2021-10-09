// Libraries
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

// Redux
import {
  calculateMinesweeper,
  generateMinesweeperPattern,
  setMinesweeperDifficulty,
} from '@Minesweeper/redux/minesweeperSlice/minesweeperSlice';

// Enums
import { Difficulty } from '@Enums/difficulty.enum';

// Types
import { RootState } from '@Types/rootState.type';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// I18n
import '@Features/i18n';

// Styles
import styles from './sidebar.module.css';

const Sidebar: FC<ChildrenNever> = () => {
  const availableFlags = useSelector((state: RootState) => state.minesweeper.availableFlags);
  const isLose = useSelector((state: RootState) => state.minesweeper.isLose);
  const isWin = useSelector((state: RootState) => state.minesweeper.isWin);

  const dispatch = useDispatch();
  const { t } = useTranslation('minesweeper');

  function handleRestart(): void {
    dispatch(generateMinesweeperPattern());
    dispatch(calculateMinesweeper());
  }

  function handleChangeDifficulty(): void {
    dispatch(setMinesweeperDifficulty({ difficulty: Difficulty.None }));
  }

  return (
    <div className={styles.sidebar}>
      <p>
        {`${t('Available')} `}
        <FontAwesomeIcon icon={faFlag} />
        {`: ${availableFlags}`}
      </p>
      {isLose && <p>{t('You lose!')}</p>}
      {isWin && <p>{t('You win!')}</p>}
      {(isLose || isWin) && (
        <div className={styles.failButtons}>
          <button
            type="button"
            onClick={handleChangeDifficulty}
          >
            {t('Change difficulty')}
          </button>
          <button
            type="button"
            onClick={handleRestart}
          >
            {t('Restart')}
          </button>
        </div>
      )}
    </div>
  );
};

export { Sidebar };