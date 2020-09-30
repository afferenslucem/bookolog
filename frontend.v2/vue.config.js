module.exports = {
  pwa: {
    themeColor: '#51bbfe',
    name: 'Bookolog',
    manifestOptions: {
      start_url: 'workspace/in-progress'
    }
  },

  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'Bookolog';
        return args;
      });

    if (process.env.NODE_ENV === 'test') {
      const sassRule = config.module.rule('scss')
      sassRule.uses.clear()
      sassRule.use('null-loader').loader('null-loader')
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'ru',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}