import styles from './index.less';
import icon from '@/assets/icons/icon-plus.svg';

const SideBar = () => {
  return (
    <nav className={styles.sidebar}>
      <button className={styles.btnNew}>
        <img className={styles.iconPlus} src={icon} alt="add" />
        <span>开始新对话</span>
      </button>

      <div className={styles.extra}>
        <ul>
          <li>
            <img className={styles.iconPlus} src={icon} alt="add" />
            <span>清除所有会话</span>
          </li>
          <li>
            <img className={styles.iconPlus} src={icon} alt="add" />
            <span>更多玩发</span>
          </li>
          <li>
            <img className={styles.iconPlus} src={icon} alt="add" />
            <span>下载App</span>
          </li>
          <li>
            <img className={styles.iconPlus} src={icon} alt="add" />
            <span>免责声明</span>
          </li>
          <li>
            <img className={styles.iconPlus} src={icon} alt="add" />
            <span>注销</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
