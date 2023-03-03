import request from 'umi-request';

export async function queryAnswer(data: Record<string, any>) {
  return request<any>('/chat', {
    method: 'POST',
    data,
  });
}

export async function queryAnswerByOpenApi(data: any) {
  const apikey = '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';
  // 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
  // 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
  return request<any>('https://api.openai.com/v1/chat/completions', {
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
