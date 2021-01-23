const { environment } = require('@rails/webpacker')

const path = require('path')

const customConfig = {
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
        }
    }
}

environment.config.merge(customConfig);

const webpack = require('webpack')
environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']
  })
)

module.exports = environment
