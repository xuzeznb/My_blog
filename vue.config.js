const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      //打包环境去掉console.log
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true,  //注释console
            drop_debugger: true, //注释debugger
            pure_funcs: ['console.log'], //移除console.log
          },
        },
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [new NodePolyfillPlugin(),
             new CompressionWebpackPlugin()],
    experiments: {
      asyncWebAssembly: true,
    },
  },
  chainWebpack: (config) => {
    // 移除prefetch插件，避免加载多余的资源
    config.plugins.delete("prefetch");
    //设置index.html  的title
    config.plugin("html").tap((args) => {
      args[0].title = "Mr_Zeの踩坑日记";
      return args;
    });
  },
})