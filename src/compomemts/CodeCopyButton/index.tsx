/**
 * @author: big.bro
 * @date:  2023-03-07
 * @time: 13:50
 * @contact: chenliheng@youlai.cn
 * @description: #
 */

import React, { FC } from 'react';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
import iconSuccess from '@/assets/icons/icon-success.svg';
import iconCopy from '@/assets/icons/icon-copy.svg';
import './index.less';

interface CodeCopyBtnProps {
  value: string;
}

const CodeCopyBtn: FC<CodeCopyBtnProps> = ({ value }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <CopyToClipboard text={value} onCopy={handleCopy}>
      <div className="code-copy-btn">
        <button>
          {copied ? (
            <img
              src={iconSuccess}
              style={{ backgroundColor: 'transparent' }}
              alt={'copied'}
            />
          ) : (
            <img
              src={iconCopy}
              style={{ backgroundColor: 'transparent' }}
              alt="Copy"
            />
          )}
        </button>
      </div>
    </CopyToClipboard>
  );
};

export default CodeCopyBtn;
