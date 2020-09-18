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
}