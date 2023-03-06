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
