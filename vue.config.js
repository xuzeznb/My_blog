const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const UselessFile = require("useless-files-webpack-plugin");
const compressionWebpackPlugin = require("compression-webpack-plugin"); //引入插件
const productionGZipExtensions = ["js", "css"]; //压缩的文件类型
const path = require("path");
module.exports = defineConfig({
  productionSourceMap: false, //是否在构建生产包时生成 sourceMap 文件，
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new UselessFile({
        root: path.resolve(__dirname, "./src"), // 项目目录
        out: "./fileList.json", // 输出文件列表
        clean: false, // 是否删除文件,
        exclude: /node_modules/, // 排除文件列表
      }),
      //打包环境去掉console.log
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true, //注释console
            drop_debugger: true, //注释debugger
            pure_funcs: ["console.log"], //移除console.log
          },
        },
      }),
      new compressionWebpackPlugin({
        //[file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"
        filename: "[path].gz[query]", // 提示compression-webpack-plugin@3.0.0的话asset改为filename
        algorithm: "gzip",
        //所有匹配该正则的资源都会被处理。默认值是全部资源
        test: new RegExp("\\.(" + productionGZipExtensions.join("|") + ")$"),
        //大小大于该值的资源会被处理。单位是 bytes。默认值是 0
        threshold: 10240,
        //压缩率小于这个值的资源才会被处理，默认值是 0.8
        minRatio: 0.8,
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [new NodePolyfillPlugin(), new CompressionWebpackPlugin()],
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
});
