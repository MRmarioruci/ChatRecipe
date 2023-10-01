const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api', createProxyMiddleware({ target: 'http://127.0.0.1:5000', changeOrigin: true }));
    app.use('/mealdb', createProxyMiddleware({
        target: 'https://www.themealdb.com',
        changeOrigin: true,
        pathRewrite: {
          '^/mealdb': '/api/json/v2/9973533/', // Rewrite the path by removing '/mealdb'
        },
    }));
};
