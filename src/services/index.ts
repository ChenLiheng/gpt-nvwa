import request from 'umi-request';

export async function queryAnswer(data: Record<string, any>) {
  return request<any>('http://13.229.45.163:8100/v1/chat', {
    method: 'POST',
    data,
  });
}

export async function queryAnswerByOpenApi(data: any) {
  const apikey = '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';
  return request('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apikey}`,
    },
    method: 'POST',
    data: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: data?.data,
      temperature: 0.6,
      // stream: true,
    }),
  });
}
