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
      '\n量子力学是一种描述微观粒子行为的理论，其主要理论包括：\n1. 波粒二象性：微观粒子既具有粒子性质，又具有波动性质。\n2. 不确定性原理：无法同时精确测量一个粒子的位置和动量。\n3. 玻尔模型：描述了原子中电子的运动轨道和能级。\n4. 薛定谔方程：描述了量子系统的演化和波函数的变化。\n5. 波函数的统计解释：波函数的平方表示了粒子在不同位置出现的概率。\n6. 量子力学中的测量：测量不仅会影响被测量的粒子，还会改变整个系统的状态。\n7. 量子纠缠：两个粒子之间存在一种神秘的联系，即使它们在空间上相隔很远。\n8. 量子计算：利用量子力学的特性进行计算，可以大大提高计算速度和效率。',
  },
  {
    role: 'ai',
    content:
      "要在 React Markdown 中实现复制功能，可以使用 `react-copy-to-clipboard` 库。该库提供了一个 `CopyToClipboard` 组件，可以将内容复制到剪贴板中。\n首先，安装 `react-copy-to-clipboard`：\n```\nnpm install react-copy-to-clipboard\n```\n然后，在需要复制的内容周围包裹 `CopyToClipboard` 组件，并将要复制的内容作为 `text` 属性传递给它：\n```jsx\nimport React from 'react';\nimport ReactMarkdown from 'react-markdown';\nimport { CopyToClipboard } from 'react-copy-to-clipboard';\n\nconst markdown = `# Heading\nSome text that you want to copy.`;\n\nfunction App() {\n  const [copied, setCopied] = React.useState(false);\n\n  const handleCopy = () => {\n    setCopied(true);\n    setTimeout(() => {\n      setCopied(false);\n    }, 2000);\n  };\n\n  return (\n    <div>\n      <CopyToClipboard text={markdown} onCopy={handleCopy}>\n        <button>{copied ? 'Copied!' : 'Copy'}</button>\n      </CopyToClipboard>\n      <ReactMarkdown>{markdown}</ReactMarkdown>\n    </div>\n  );\n}\n\nexport default App;\n```",
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
