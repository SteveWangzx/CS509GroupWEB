export default {
  '/api': {
    target: 'https://6sdg3w27ja.execute-api.us-east-2.amazonaws.com/Alpha',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};
