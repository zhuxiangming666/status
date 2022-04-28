/** @format */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use('/v1',
    createProxyMiddleware({
      // target: 'http://10.80.25.100:8080',
      target: 'http://10.81.138.205:30555',
      changeOrigin: true
    })
  ),
    app.use(
      '/events',
      createProxyMiddleware({
        // target: 'http://10.80.25.100:8080', // 时间推送
        target: 'http://10.81.138.205:30555',
        changeOrigin: true
      })
    );
};
