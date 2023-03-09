const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports = {
  chainWebpack: (config) => {
    // 移除prefetch插件，避免加载多余的资源
    config.plugins.delete("prefetch");
    //设置index.html  的title
    config.plugin("html").tap((args) => {
      args[0].title = "Mr_Zeの踩坑日记";
      return args;
    });
  },
};
