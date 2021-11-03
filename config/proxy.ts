export default {
  '/api': {
    target: 'http://192.168.1.6:8081/v3',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};
