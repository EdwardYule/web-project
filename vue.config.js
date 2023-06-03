module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      "/dev-api": {
        target: "http://43.156.83.96:8080",
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    },
  },
}
