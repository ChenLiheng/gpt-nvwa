import styles from './index.less';
import icon from '@/assets/icons/icon-plus.svg';
import iconChat from '@/assets/icons/icon-msg.svg';
import iconDelete from '@/assets/icons/icon-delete.svg';
import { useModel } from '@@/exports';
import { uuid } from '@/utils';

const SideBar = () => {
  const { msgList, setMsgList, chatList, setChatList } = useModel('chat');

  const newChat = () => {
    setChatList([...chatList, { id: uuid(), list: msgList }]);
    setMsgList([]);
  };

  const clearChat = () => {
    setChatList([]);
    setMsgList([]);
  };

  const changeChat = (id?: string) => {
    const chat = chatList?.find((i) => i.id === id);
    setMsgList(chat?.list || []);
  };

  const deleteChat = (id: string) => {
    const list = chatList?.filter((i) => i.id !== id);
    setChatList([...(list || [])]);
  };

  const getChatTitle = (id: string) => {
    const chat = chatList?.find((i) => i.id === id);
    if (chat?.list && chat?.list?.length > 0) {
      return chat?.list[0]?.content;
    }
    return '新对话';
  };

  return (
    <nav className={`${styles.sidebar} ${styles.hidden}`}>
      <div className={styles.menu}>
        <button className={styles.btn} onClick={newChat}>
          <img className={styles.iconPlus} src={icon} alt="add" />
          <span>开始新对话</span>
        </button>
        {chatList?.map((item) => (
          <button
            className={`${styles.btn} ${styles.noBorder}`}
            key={item?.id}
            onClick={() => changeChat(item?.id)}
          >
            <img className={styles.iconPlus} src={iconChat} alt="add" />
            <span>{getChatTitle(item?.id)}</span>
            <img
              className={styles.iconPlus}
              src={iconDelete}
              alt="add"
              onClick={() => deleteChat(item?.id)}
            />
          </button>
        ))}
      </div>

      <div className={styles.extra}>
        <ul>
          <li className={styles.extraItem} onClick={clearChat}>
            {/*<img className={styles.iconPlus} src={icon} alt="add" />*/}
            <span>清除所有会话</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
