import SideBar from '@/compomemts/Sidebar';
import styles from './index.less';
import MessageList from '@/compomemts/MessageList';
import { useCallback, useRef, useState } from 'react';
import iconSend from '@/assets/icons/icon-send.svg';
import { useModel } from '@@/exports';
import GuideList from '@/compomemts/GuideList';
import useViewport from '@/hooks/useViewport';
import Header from '@/compomemts/Header';
import { useMount } from 'ahooks';

export default function HomePage() {
  const { msgList, setMsgList, loading, setLoading, controller } =
    useModel('chat');
  const { width } = useViewport();
  const [humanMsg, setHumanMsg] = useState('');
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const requestAiMessage = (data: any) => {
    setLoading(true);
    const decoder = new TextDecoder('utf-8');
    try {
      fetch('http://43.198.72.177:8100/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: data }),
        signal: controller?.current?.signal,
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
          let chunks: string[] = [];

          const processChunk = ({ done, value }: any) => {
            if (done) {
              setLoading(false);
              setMsgList((prev) => [...prev, aiMsg(chunks?.join(''))]);
              setCurrentAssistantMessage('');
              return;
            }
            const char = decoder
              .decode(new Uint8Array(value))
              ?.replace(/\n\n/g, '\n');
            console.log(JSON.stringify(char));

            if (char) {
              setCurrentAssistantMessage((prev) => {
                if (char === '\n' && currentAssistantMessage.endsWith('\n')) {
                  return prev;
                }
                chunks.push(char);
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
    } catch (e) {
      console.log(e);
    }
  };

  useMount(() => {
    controller?.current?.signal?.addEventListener('abort', abortHandle);
  });

  const abortHandle = useCallback(() => {
    setMsgList((prev) => [...prev, aiMsg(currentAssistantMessage)]);
    setCurrentAssistantMessage('');
    setLoading(false);
  }, [currentAssistantMessage]);

  const handleInput = (e: any) => {
    setHumanMsg(e.target.value);
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
      role: 'assistant',
      content: fmtContent,
    };
  };

  const send = () => {
    if (loading) {
      return;
    }
    if (humanMsg?.length > 0) {
      setHumanMsg('');
      setMsgList((prev) => [...prev, userMsg(humanMsg)]);
      const history = [...(msgList?.slice(-5) || []), userMsg(humanMsg)];
      requestAiMessage(history);
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

  const selPrompt = (val: string) => {
    setHumanMsg(val);
    textAreaRef?.current?.focus();
  };

  return (
    <div className={styles.home}>
      {width > 769 && <SideBar />}
      <main className={styles.main}>
        {width <= 769 && <Header />}
        {!msgList ||
          (msgList?.length === 0 && <GuideList onChange={selPrompt} />)}
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
            {!loading ? (
              <div className={styles.iconWrap} onClick={send}>
                <img className={styles.iconSend} src={iconSend} alt="发送" />
              </div>
            ) : (
              <div className={styles.loading}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          <div className={styles.tip}>基于OpenAI 最新模型（gpt-3.5-turbo）</div>
        </div>
      </main>
    </div>
  );
}
