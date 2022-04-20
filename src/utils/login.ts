// import { ClearCookies, SetCookieToken, SetCookieUsername } from './cookies';
// import { debounce } from './helpers';

// export const getToken = () => window.localStorage.getItem('token');
// export const toFortressLogin = () => {
//   ClearCookies();
//   window.location.replace(
//     `https://fortress.smoa.cloud/login?appId=${process.env.REACT_APP_FROTRESS_APPID}&serviceUrl=${window.location.href}`
//   );
// };

// type TVerify = {a
//   okText?: string;
//   noAccessText?: string;
//   verifyTicket: ({ ticket }: { ticket: string }) => Promise<{
//     token: {
//       AccessToken: string;
//       RefreshToken: string;
//       Username: string;
//     };
//   }>;
// };

// export const verifyFortressTicket = debounce(async ({ okText, noAccessText, verifyTicket }: TVerify) => {
//   const ticket = new URLSearchParams(window.location.search).get('ticket');

//   if (!ticket) {
//     return message.loading(noAccessText ?? '正在跳转 Fortress 登录...', 0.8).then(toFortressLogin);
//   }

//   try {
//     const { token } = await verifyTicket({ ticket });
//     SetCookieToken(token);
//     SetCookieUsername(token.Username);
//     message.loading(okText ?? '登录成功', 0.3).then(() => window.location.reload());
//   } catch (error: any) {
//     toFortressLogin();
//   }
// }, 300);

export const getTokn = () =>{};
