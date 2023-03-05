import SideBar from '@/compomemts/Sidebar';
import styles from './index.less';
import MessageList from '@/compomemts/MessageList';
import { useEffect, useRef, useState } from 'react';
import iconSend from '@/assets/icons/icon-send.svg';
import { useModel } from '@@/exports';
import GuideList from '@/compomemts/GuideList';
import useViewport from '@/hooks/useViewport';
import Header from '@/compomemts/Header';

export default function HomePage() {
  const { msgList, setMsgList, loading, setLoading } = useModel('chat');
  const { width } = useViewport();
  const [humanMsg, setHumanMsg] = useState('你可以帮我做点什么？');
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const requestAiMessage = (data: any) => {
    setLoading(true);
    const decoder = new TextDecoder('utf-8');
    fetch('http://13.229.45.163:8100/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
      .then((response) => {
        const reader = response?.body?.getReader();

        return new ReadableStream({
          start(controller) {
            function push() {
              reader?.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }

                controller.enqueue(value);
                push();
              });
            }

            push();
          },
        });
      })
      .then((stream) => {
        const reader = stream.getReader();
        let chunks = [];

        const processChunk = ({ done, value }: any) => {
          if (done) {
            setLoading(false);
            return;
          }
          chunks.push(value);
          const char = decoder.decode(new Uint8Array(value));
          console.log(char);

          if (char) {
            setCurrentAssistantMessage((prev) => {
              if (char === '\n' && currentAssistantMessage.endsWith('\n')) {
                return prev;
              }
              return prev + char;
            });
          }
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
          reader.read().then(processChunk);
        };
        reader.read().then(processChunk);
      });
  };

  useEffect(() => {
    if (!loading && currentAssistantMessage) {
      setMsgList((prev) => [...prev, aiMsg(currentAssistantMessage)]);
      setCurrentAssistantMessage('');
    }
  }, [loading]);

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
      requestAiMessage(humanMsg);
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

  // Human:写一首赞美祖国的诗
  return (
    <div className={styles.home}>
      {width > 769 && <SideBar />}
      <main className={styles.main}>
        {width <= 769 && <Header />}
        {!msgList ||
          (msgList?.length === 0 && (
            <GuideList onChange={(val) => setHumanMsg(val)} />
          ))}
        <MessageList
          data={msgList}
          loading={loading}
          currentAssistantMessage={currentAssistantMessage}
        />
        <div className={styles.footer}>
          <div className={styles.sendInput}>
            <textarea
              ref={textAreaRef}
              value={humanMsg}
              placeholder="发送消息给AI"
              onKeyDownCapture={handleKeyDown}
              onInput={(e) => handleInput(e)}
            />
            <div className={styles.iconWrap} onClick={send}>
              <img className={styles.iconSend} src={iconSend} alt="发送" />
            </div>
          </div>

          <div className={styles.tip}>
            基于OpenAI
            最新接口（gpt-3.5-turbo）,不收集任何个人隐私数据，免费使用
          </div>
        </div>
      </main>
    </div>
  );
}
