const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.module
      .rule('xlsx')
      .test(/\.(xlsx|xls)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[ext]',
      })
      .end();
  },
});
