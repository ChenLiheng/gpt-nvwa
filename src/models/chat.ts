/**
 * @author: big.bro
 * @date:  2023-03-02
 * @time: 20:16
 * @contact: chenliheng@youlai.cn
 * @description: #
 */
import { useRef, useState } from 'react';

type Message = { role: string; content: string };

type Chat = { id: string; list: Message[] };

const defMsgs = [
  {
    role: 'user',
    content: 'React markdown 实现复制功能',
  },
  {
    role: 'ai',
    content:
      "要在 React Markdown 中实现复制功能，可以使用 `react-copy-to-clipboard` 库。该库提供了一个 `CopyToClipboard` 组件，可以将内容复制到剪贴板中。\n\n首先，安装 `react-copy-to-clipboard`：\n\n```\nnpm install react-copy-to-clipboard\n```\n\n然后，在需要复制的内容周围包裹 `CopyToClipboard` 组件，并将要复制的内容作为 `text` 属性传递给它：\n\n```jsx\nimport React from 'react';\nimport ReactMarkdown from 'react-markdown';\nimport { CopyToClipboard } from 'react-copy-to-clipboard';\n\nconst markdown = `# Heading\n\nSome text that you want to copy.`;\n\nfunction App() {\n  const [copied, setCopied] = React.useState(false);\n\n  const handleCopy = () => {\n    setCopied(true);\n    setTimeout(() => {\n      setCopied(false);\n    }, 2000);\n  };\n\n  return (\n    <div>\n      <CopyToClipboard text={markdown} onCopy={handleCopy}>\n        <button>{copied ? 'Copied!' : 'Copy'}</button>\n      </CopyToClipboard>\n      <ReactMarkdown>{markdown}</ReactMarkdown>\n    </div>\n  );\n}\n\nexport default App;\n```\n\n在这个例子中，我们将 `markdown` 作为 `text` 属性传递给 `CopyToClipboard` 组件。当用户点击复制按钮时，`onCopy` 回调函数将被触发。在这个例子中，我们将 `copied` 状态设置为 `true`，并在 2 秒后将其设置回 `false`。这个状态用于显示复制按钮的文本。\n\n注意，`CopyToClipboard` 组件必须包裹可点击元素，例如按钮。如果你想要包裹文本，可以将 `CopyToClipboard` 组件放在一个 `span` 元素中。\n\n这样，你就可以在 React Markdown 中实现复制功能了。",
  },
];

export default () => {
  const [msgList, setMsgList] = useState<Message[]>([]);

  const [curChat, setCurChat] = useState<any>();

  const [loading, setLoading] = useState(false);

  const [chatList, setChatList] = useState<Chat[]>([]);

  const controller = useRef(new AbortController());

  return {
    msgList,
    setMsgList,
    loading,
    setLoading,
    chatList,
    setChatList,
    curChat,
    setCurChat,
    controller,
  };
};
