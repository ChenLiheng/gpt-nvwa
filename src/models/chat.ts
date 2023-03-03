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

  return {
    msgList,
    setMsgList,
  };
};
