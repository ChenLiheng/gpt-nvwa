/**
 * @author: big.bro
 * @date:  2023-03-02
 * @time: 20:16
 * @contact: chenliheng@youlai.cn
 * @description: #
 */
import { useState } from 'react';

export default () => {
  const [msgList, setMsgList] = useState<{ role: string; content: string }[]>(
    [],
  );

  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState<
    { id: string; list: { role: string; content: string }[] }[]
  >([]);

  return {
    msgList,
    setMsgList,
    loading,
    setLoading,
    chatList,
    setChatList,
  };
};
