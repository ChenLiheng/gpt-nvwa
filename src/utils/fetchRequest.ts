import { genNonceStr } from '@/utils/index';
import { ec } from 'elliptic';
import { sha256 } from 'js-sha256';

const EC = new ec('secp256k1');

const privateKey =
  '73f86fcf5d667c84e1aa38f6863a80f7030cde5e5005790917952f3e5d2265f8';
const sk = EC.keyFromPrivate(privateKey, 'hex');

const headers = {
  'Content-Type': 'application/json',
};

export async function fetchPost(url: string, data: any, options?: RequestInit) {
  // 将全局变量 headers 合并到请求头中
  const mergedHeaders = Object.assign({}, headers, options?.headers || {});
  // 签名
  const nonce = genNonceStr();
  const timestamp = Date.now();

  const signPayload = {
    nonce,
    timestamp,
    ...data,
  };

  const signData = JSON.stringify(signPayload);
  console.log('signData:', signData);
  const hexData = sha256(signData);
  console.log('hexData:', hexData);
  const signature = sk.sign(hexData, { canonical: true });
  const signatureStr = signature.toDER('hex');
  console.log('签名结果', signatureStr);

  const payload = {
    ...signPayload,
    signature: signatureStr,
  };

  // 将修改后的请求头信息保存到 options 对象中
  const modifiedOptions = Object.assign({}, options, {
    headers: mergedHeaders,
    method: 'POST',
    body: JSON.stringify(payload),
  });
  // 调用原生的 fetch 函数发送请求
  return await fetch(url, modifiedOptions);
}
