import SideBar from '@/compomemts/Sidebar';
import styles from './index.less';
import MessageList from '@/compomemts/MessageList';
import { useRequest } from 'ahooks';
import { queryAnswer, queryAnswerByOpenApi } from '@/services';
import { useEffect, useRef, useState } from 'react';
import iconSend from '@/assets/icons/icon-send.svg';
import { useModel } from '@@/exports';

export default function HomePage() {
  const isOpenApi = false;

  const { msgList, setMsgList } = useModel('chat');
  const [humanMsg, setHumanMsg] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    data,
    run: query,
    loading,
  } = useRequest(
    (data: any) =>
      isOpenApi ? queryAnswerByOpenApi({ data }) : queryAnswer({ data }),
    {
      manual: true,
    },
  );

  const handleInput = (e: any) => {
    setHumanMsg(e.target.value);
    console.log(e.target.value.split('\n').length);
  };

  const userMsg = (content: string) => ({
    role: 'user',
    content,
  });

  const aiMsg = (content: string) => {
    let fmtContent = content;
    if (content.startsWith('\n\n')) {
      fmtContent = content.substring(2, content.length);
    }
    return {
      role: 'ai',
      content: fmtContent,
    };
  };

  const send = () => {
    if (humanMsg?.length > 0) {
      setHumanMsg('');
      setMsgList((prev) => [...prev, userMsg(humanMsg)]);
      if (isOpenApi) {
        query([...msgList, userMsg(humanMsg)]);
      } else {
        // 黄反接口请求
        query(humanMsg);
      }
    }
  };

  const handleKeyDown = (e: any) => {
    let code = e.charCode || e.keyCode;
    if (code === 13) {
      e.stopPropagation();
      e.preventDefault();
      send();
    }
  };

  useEffect(() => {
    if (data) {
      if (isOpenApi) {
        const msgs = data?.choices?.map((item: any) => item.message);
        setMsgList([...msgList, ...(msgs || [])]);
      } else {
        setMsgList([...msgList, aiMsg(data?.data)]);
      }
    }
  }, [data]);

  // Human:写一首赞美祖国的诗

  return (
    <div className={styles.home}>
      <SideBar />
      <main className={styles.main}>
        <MessageList data={msgList} loading={loading} />

        <div className={styles.footer}>
          <div className={styles.sendInput}>
            <textarea
              // rows={1}
              ref={textAreaRef}
              value={humanMsg}
              onKeyDownCapture={handleKeyDown}
              onInput={(e) => handleInput(e)}
            />
            <div className={styles.iconWrap} onClick={send}>
              <img className={styles.iconSend} src={iconSend} alt="发送" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
