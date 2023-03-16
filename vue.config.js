const path = require('path')

module.exports = {
    devServer:{
        port:9999, // 启动端口号
        open:true  // 启动后是否自动打开网页
    },
    chainWebpack:config => {
        config.module
        .rule('svg')
        .exclude.add(path.join(__dirname, 'src/assets/icons/svg'))
        .end()

        config.module
        .rule('icon')
        .test(/\.svg$/)
        .include.add(path.join(__dirname, 'src/assets/icons/svg'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId:'icon-[name]'
        })
        .end()
    }
}