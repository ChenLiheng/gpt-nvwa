import { Context, extend, RequestOptionsInit } from 'umi-request';

/**
 * 异常处理程序
 */

const errorHandler = (error: any) => {
  const { response } = error;
  if ([404, 500].includes(response?.status)) {
    console.table({
      message: `${response?.status}:${response?.statusText}`,
      description: response?.url,
    });
  }
  return Promise.reject(error);
};

const requestSignMiddleware = async (ctx: Context, next: () => void) => {
  await next();
};

const requestSignInterceptor = (url: string, options: RequestOptionsInit) => {
  const { data } = options;
  console.log(`request data:%c${url}`, 'background: green; color: #fff', data);
  const { headers = {} } = options;
  options.headers = {
    ...headers,
  };

  return {
    url: `${url}`,
    options: { ...options, interceptors: true },
  };
};

const request = extend({
  prefix: '',
  timeout: 10000,
  headers: {},
  errorHandler,
});
request.use(requestSignMiddleware);
request.interceptors.request.use(requestSignInterceptor);

export default request;
