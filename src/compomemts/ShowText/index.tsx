/**
 * @author: big.bro
 * @date:  2023-03-02
 * @time: 23:50
 * @contact: chenliheng@youlai.cn
 * @description: #
 */

import { useMount } from 'ahooks';
import EasyTyper from 'easy-typer-js';
import { useState } from 'react';

const ShowText = ({ text }: { text: string }) => {
  const [output, setOutput] = useState();

  useMount(() => {
    initTyper();
  });

  const initTyper = () => {
    const obj = {
      output: '',
      isEnd: false,
      speed: 30,
      singleBack: false,
      sleep: 0,
      type: 'normal',
      backSpeed: 40,
      sentencePause: false,
    };

    new EasyTyper(
      obj,
      text,
      () => {},
      (val: any) => {
        setOutput(val);
      },
    );
  };

  return <span>{output}</span>;
};

export default ShowText;
