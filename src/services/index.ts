import request from 'umi-request';

export async function queryAnswer(data: Record<string, any>) {
  return request<any>('/chat', {
    method: 'POST',
    data,
  });
}
