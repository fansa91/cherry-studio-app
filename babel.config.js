module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          'react-compiler': {
            panicThreshold: 'all_errors'
          }
        }
      ]
    ],
    plugins: [['inline-import', { extensions: ['.sql'] }]]
  }
}
