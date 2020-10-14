module.exports = {
  pwa: {
    themeColor: '#51bbfe',
    name: 'Bookolog',
    manifestOptions: {
      start_url: '.'
    },
    workboxOptions: {
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: 'index.html',
      runtimeCaching: [
        {
          urlPattern: /\.(jpg|jpeg|svg|png)$/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'avatars',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60,
              purgeOnQuotaError: true,
            },
          },
        },
      ],
    },
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