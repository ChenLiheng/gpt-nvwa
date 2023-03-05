import { parseOpenAIStream } from '@/utils/openAI';
import request from 'umi-request';

export async function queryAnswer(data: Record<string, any>) {
  return request<any>('http://13.229.45.163:8100/v1/chat', {
    method: 'POST',
    data,
  });
}

export async function queryAnswerByOpenApi(data: any) {
  const apikey = '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';
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apikey}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: data,
      temperature: 0.6,
      stream: true,
    }),
  });
  return new Response(parseOpenAIStream(response));
}
