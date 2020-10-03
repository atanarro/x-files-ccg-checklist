module.exports = {
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .options({
        fix: process.env.NODE_ENV !== 'production'
      });
  },
};
