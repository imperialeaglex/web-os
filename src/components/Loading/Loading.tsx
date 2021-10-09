// Libraries
import { FC } from 'react';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './loading.module.css';

const Loading: FC<ChildrenNever> = () => (
  <div className={styles.loadingRing}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export { Loading };
