const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const webpack = require('webpack')
const { parsed: localEnv } = require('dotenv').config()

let BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : process.env.PROD_URL

const cssConfig = {
    cssModules: true,
    cssLoaderOptions: {
        camelCase: true
    }
}

const nextConfig = {
    publicRuntimeConfig: {
        base_url: BASE_URL
    },

    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

        return config
    }
}

module.exports = withPlugins([
    [withCSS, cssConfig]
], nextConfig);