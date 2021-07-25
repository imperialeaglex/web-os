// React, redux
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

// Types
import { Message } from 'src/types/message';

// Styles
import styles from './messageItem.module.css';

type PropsType = {
  children?: never;
  message: Message;
};

const MessageItem: FC<PropsType> = ({ message }: PropsType) => {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <motion.li
      className={`${styles.msgContainer} ${username === message.username ? styles.myMsg : ''}`}
      initial={{ y: 50, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <img
        src={
          message.photo ||
          'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg'
        }
        alt="avatar"
        width="60px"
        height="60px"
        className={styles.avatar}
      />
      <div className={styles.nameAndMsgContainer}>
        <div className={styles.ownerAndDateContainer}>
          <p className={styles.msgOwner}>{message.username || 'anonymous'}</p>
          <p className={styles.msgDate}>{message.date || ''}</p>
        </div>
        <p className={styles.otherMsg}>{message.text}</p>
      </div>
    </motion.li>
  );
};

export { MessageItem };
