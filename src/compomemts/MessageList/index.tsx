/**
 * @author: big.bro
 * @date:  2023-03-02
 * @time: 09:51
 * @contact: chenliheng@youlai.cn
 * @description: #
 */
import aiLogo from '@/assets/icons/ai-logo.svg';
import userLogo from '@/assets/icons/user-logo.svg';
import { FC, useEffect, useRef } from 'react';
import ShowText from '@/compomemts/ShowText';
import MarkDown from 'react-markdown';
import 'github-markdown-css';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // 代码高亮
// @ts-ignore
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './index.less';

interface MessageListProps {
  data?: { role: string; content: string }[];
  loading?: boolean;
  currentAssistantMessage?: string;
}

const MessageItem = ({ data, loading }: any) => (
  <div
    className={styles.msgItem}
    style={{ background: data?.role === 'user' ? '#fff' : '#f7f7f7' }}
  >
    <div className={styles.msgBody}>
      <img
        className={styles.logo}
        src={data?.role === 'user' ? userLogo : aiLogo}
        alt={''}
      />
      <div className={styles.content}>
        <MarkDown
          className="markdown-body bg-transparent"
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {data?.content}
        </MarkDown>
        {loading && <div className={styles.cursor}></div>}
      </div>
    </div>
  </div>
);

const Loading = ({ content }: { content?: string }) => (
  <MessageItem data={{ role: 'ai', content }} loading />
);

const MessageList: FC<MessageListProps> = ({
  data,
  loading = false,
  currentAssistantMessage,
}) => {
  const listContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollBottom = () => {
    if (listContainerRef?.current) {
      const { scrollHeight, clientHeight } = listContainerRef?.current;
      listContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    handleScrollBottom();
  }, [data]);

  return (
    <div className={styles.msgList} ref={listContainerRef}>
      {data?.map((item, index) => (
        <MessageItem key={`${item.role}_${index}`} data={item} />
      ))}
      {loading && <Loading content={currentAssistantMessage} />}
    </div>
  );
};

export default MessageList;
