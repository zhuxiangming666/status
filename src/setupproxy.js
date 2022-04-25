/** @format */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/v1', {
      target: 'http://10.80.21.166:8080',
      changeOrigin: true
    })
  ),
    app.use(
      createProxyMiddleware('/event', {
        target: 'http://10.80.21.166:8080', // 时间推送
        changeOrigin: true
      })
    );
};
