module.exports = {
  presets: [
    ["@babel/preset-env", // 智能转换成目标运行环境代码
      {
        useBuiltIns: 'usage', // 按需引入polyfill
        corejs: 3
      }
    ],
    [
      "@babel/preset-typescript",
      {
        allExtensions: true // 支持所有扩展名，支持.vue
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime", // polyfill
      {
        corejs: 3
      }
    ],
    "@babel/proposal-class-properties", // 支持ts类写法
    "@babel/proposal-object-rest-spread" // 支持三点展开符
  ]
}