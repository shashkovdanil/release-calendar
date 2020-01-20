require('dotenv').config()

const { join } = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  webpack: config => {
    config.plugins = config.plugins || []

    const envVariableFileName = `.env.${process.env.NODE_ENV}`

    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: join(__dirname, envVariableFileName),
        systemvars: true,
      }),
    ]

    return config
  },
}
