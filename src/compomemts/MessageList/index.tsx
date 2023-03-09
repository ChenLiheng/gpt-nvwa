/**
 * @author: big.bro
 * @date:  2023-03-02
 * @time: 09:51
 * @contact: chenliheng@youlai.cn
 * @description: #
 */
import aiLogo from '@/assets/icons/ai-logo.svg';
import userLogo from '@/assets/icons/user-logo.svg';
import { FC, Fragment, useEffect, useRef } from 'react';
import MarkDown from 'react-markdown';
import 'github-markdown-css';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // 代码高亮
// @ts-ignore
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

import styles from './index.less';
import CodeCopyBtn from '@/compomemts/CodeCopyButton';
import { useDebounceFn } from 'ahooks';

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
          className="markdown-body answer bg-transparent"
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <>
                  <CodeCopyBtn value={String(children)} />
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                </>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {`${data?.content} ${
            loading ? `<span class="output-cursor"></span>` : ''
          }`}
        </MarkDown>
      </div>
    </div>
  </div>
);

const Loading = ({ content }: { content?: string }) => (
  <MessageItem data={{ role: 'assistant', content }} loading />
);

const MessageList: FC<MessageListProps> = ({
  data,
  loading = false,
  currentAssistantMessage,
}) => {
  const listContainerRef = useRef<HTMLDivElement>(null);

  const { run: handleScrollBottom } = useDebounceFn(
    () => {
      if (listContainerRef?.current) {
        const { scrollHeight, clientHeight } = listContainerRef?.current;
        listContainerRef.current.scrollTo({
          top: scrollHeight - clientHeight,
          behavior: 'smooth',
        });
      }
    },
    { wait: 50 },
  );

  useEffect(() => {
    handleScrollBottom();
  }, [data, currentAssistantMessage]);

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
