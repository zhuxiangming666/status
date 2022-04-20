// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// const NotAuthToken = [2102, 2103, 2104];
// const NotFoundCode = [3201, 3203, 4201, 4203, 5201, 6203, 7201];
// const RefreshTokenCode = 2105;

// interface Service extends AxiosInstance {
//   (config: AxiosRequestConfig): Promise<any>;
// }

// const CancelToken = axios.CancelToken;
// CancelToken.source();

// function generateReqKey(config: any) {
//   return config.headers.cancelKey;
// }

// const pendingRequest = new Map();
// function addPendingRequest(config: AxiosRequestConfig) {
//   const requestKey = generateReqKey(config);
//   if (!requestKey) return;
//   config.cancelToken =
//     config.cancelToken ||
//     new axios.CancelToken((cancel) => {
//       if (!pendingRequest.has(requestKey)) {
//         pendingRequest.set(requestKey, cancel);
//       }
//     });
// }

// function removePendingRequest(config: AxiosRequestConfig) {
//   const requestKey = generateReqKey(config);
//   if (pendingRequest.has(requestKey)) {
//     const cancelToken = pendingRequest.get(requestKey);
//     cancelToken('axios.cancel');
//     pendingRequest.delete(requestKey);
//   }
// }

// function HttpRequest(baseURL: string) {
//   const service: Service = axios.create({ baseURL });

//   service.interceptors.request.use(
//     (config: any) => {
//       config.headers.Authorization = `Bearer ${GetCookieAccessToken()}`;
//       removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
//       addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
//       return config;
//     },
//     (err: any) => Promise.reject(err)
//   );

//   service.interceptors.response.use(
//     async (res: AxiosResponse) => {
//       removePendingRequest(res.config); // 从pendingRequest对象中移除请求
//       const { data } = res;

//       const code: ErrorCode = data?.status?.Code;
//       code !== 0 && message.destroy();

//       if (NotAuthToken.includes(code)) {
//         verifyFortressTicket({ verifyTicket });
//         return Promise.reject(data);
//       }

//       if (NotFoundCode.includes(code)) {
//         window.location.href = GetDocFileUrl('/notfound');
//         return;
//       }

//       if (code === RefreshTokenCode) {
//         SetCookieToken(data.token);
//         SetLastPathName(window.location.pathname);

//         window.location.href = GetDocFileUrl('/notauth');
//         return;
//       }

//       if (code !== 0) {
//         const Msg = DocaemonHttpException?.[code];
//         code !== 2101 && Msg && message.info(Msg);

//         __DEV__ && console.log('axios.response.resolve:', data);
//         return Promise.reject(data);
//       }

//       return data;
//     },
//     (error: any) => {
//       if (error?.message === 'axios.cancel') return Promise.reject({ cancel: true });
//       message.destroy();
//       message.error('服务器错误，请稍后重试');

//       __DEV__ && console.log('axios.response.reject:', error.response);
//       return Promise.reject(error.response);
//     }
//   );

//   return service;
// }

// const v1 = HttpRequest(process.env.REACT_APP_PREFIX || '/v1');
// const v2 = HttpRequest(process.env.REACT_APP_NODE_PREFIX || '/v2');

// export { v1, v2 };

import axios from  'axios'
export const a = axios;