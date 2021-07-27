module.exports = {

    //构建输出目录
    outputDir: 'dist',
    //是否开启eslint检测，默认为true
    lintOnSave: false,

    //配置跨域请求
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        proxy: {
            '/api': {
                target: 'http://localhost:9596/',
                //target: 'http://192.168.1.106:9596/',
                ws: true,
                changeOrigin: true,
                // 代替跨域的地址
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    }

}