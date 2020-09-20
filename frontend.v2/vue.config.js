module.exports = {
    pwa: {
        themeColor: '#51bbfe',
        name: 'Bookolog'
    },

    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap((args) => {
            args[0].title = 'Bookolog';
            return args;
            });
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
