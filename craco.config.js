// 此文件目的：配置@别名
const path = require('path')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      // __dirname指向此项目的根目录路径，所以src指向src目录
      '@': path.resolve(__dirname, 'src')
    }
  }
}