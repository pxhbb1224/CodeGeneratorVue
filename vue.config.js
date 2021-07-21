module.exports = {

    lintOnSave: false,

    //配置跨域请求
    devServer: {
        open: true,
        https: false,
        proxy: {
            '/api': {
                target: 'http://localhost:9595/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    }

}