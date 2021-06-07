//改写react-app-create默认配置
const { useBabelRc, override,addDecoratorsLegacy } = require('customize-cra')

const config = override(addDecoratorsLegacy())

module.exports = config