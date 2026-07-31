const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    externals: {
      "jquery": "jQuery",
      "sockjs": "SockJS",
      "stomp": "Stomp",
    }
  }
})
