import styles from './index.less';
import icon from '@/assets/icons/icon-plus.svg';
import iconChat from '@/assets/icons/icon-msg.svg';
import iconDelete from '@/assets/icons/icon-delete.svg';
import iconMail from '@/assets/icons/icon-mail.svg';
import iconTelegram from '@/assets/icons/icon-telegram.svg';
import { useModel, useNavigate } from '@@/exports';
import { uuid } from '@/utils';

const SideBar = () => {
  const {
    msgList,
    setMsgList,
    curChat,
    setCurChat,
    chatList,
    setChatList,
    controller,
    setLoading,
  } = useModel('chat');

  const navigate = useNavigate();

  const isExistNewChat = () => {
    return chatList?.filter((item) => item?.list?.length === 0)?.length > 0;
  };

  const newChat = () => {
    controller?.current?.abort();

    if (isExistNewChat()) {
      return;
    }

    setTimeout(() => {
      if (curChat) {
        setChatList([...chatList, { id: uuid(), list: [] }]);
      } else {
        setChatList([...chatList, { id: uuid(), list: msgList }]);
      }
      setMsgList([]);
    }, 100);
  };

  const clearChat = () => {
    setChatList([]);
    setMsgList([]);
  };

  const changeChat = (id?: string) => {
    const chat = chatList?.find((i) => i.id === id);
    setCurChat(chat);
    setMsgList(chat?.list || []);
    navigate(`/chat/${id}`, { replace: true });
  };

  const deleteChat = (id: string) => {
    const list = chatList?.filter((i) => i.id !== id);
    if (id === curChat?.id) {
      setCurChat(null);
      setMsgList([]);
    }
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
            className={`${styles.btn} ${styles.noBorder} ${
              item?.id === curChat?.id ? styles.activeBtn : ''
            }`}
            key={item?.id}
            onClick={() => changeChat(item?.id)}
          >
            <img className={styles.iconPlus} src={iconChat} alt="add" />
            <span>{getChatTitle(item?.id)}</span>
            <img
              className={styles.iconDel}
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
            <img className={styles.iconPlus} src={iconDelete} alt="delete" />
            <span>清除所有会话</span>
          </li>
          <li className={styles.extraItem}>
            <a href="https://t.me/chatgptv12345" target="_blank">
              <img
                className={styles.iconPlus}
                src={iconTelegram}
                alt="delete"
              />
              <span>加入Telegram电报组</span>
            </a>
          </li>
          <li className={styles.extraItem}>
            <a href="mailto://contact@want.chat">
              <img className={styles.iconPlus} src={iconMail} alt="delete" />
              <span>contact@want.chat</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
