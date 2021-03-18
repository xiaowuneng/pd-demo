const path = require('path')

const data = require('./mock/mock.json')

module.exports = {
  publicPath: '/',
  outputDir: 'pd-demo', // 打包输出地址
  assetsDir: '', // 静态资源目录
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.join(__dirname, './src/'))
      .set('utils', path.join(__dirname, './src/utils'))
      .set('views', path.join(__dirname, './src/views'))
  },
  devServer: {
    port: 8000,
    // 添加接口数据
    before (app) {
      // 配置请求路由和响应
      app.get('/api/getMenus', (req, res) => {
        res.json(data.menu)
      })
      app.get('/api/getPoetry', (req, res) => {
        res.json(data.poetry)
      })
      app.get('/api/getDynasties', (req, res) => {
        res.json(data.dynasties)
      })
    }
  }
}
