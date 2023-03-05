import styles from './index.less';
import icon from '@/assets/icons/icon-plus.svg';
import { useModel } from '@@/exports';

const SideBar = () => {
  const { setMsgList } = useModel('chat');

  return (
    <nav className={`${styles.sidebar} ${styles.hidden}`}>
      <div className={styles.menu}>
        <button className={styles.btnNew} onClick={() => setMsgList([])}>
          <img className={styles.iconPlus} src={icon} alt="add" />
          <span>开始新对话</span>
        </button>
      </div>

      <div className={styles.extra}>
        <ul>
          <li className={styles.extraItem} onClick={() => setMsgList([])}>
            {/*<img className={styles.iconPlus} src={icon} alt="add" />*/}
            <span>清除所有会话</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
