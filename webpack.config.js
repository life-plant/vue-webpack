var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin =require('extract-text-webpack-plugin');
var path =require('path');

let babelLoaderOptions = {
    "presets": ["env", "stage-2"],
    "plugins": ["transform-runtime"]
}
let host = '//localhost:9000'
let deployTag = 'KYLXL4u'
let config = {
    paths: {
        src: path.resolve(__dirname,"app/src"),
    }
}
console.log(config.paths.src);
module.exports = {
    entry: {
        vendor: ["babel-polyfill", "./app/src/js/vendor"],
        app: ["./app/src/js/app"],
    },
    output: {
        path: path.resolve(__dirname,"app/dist"),
        publicPath: "",
        filename: 'js/[name]/[chunkhash:8].bundle.js',
    },
    // mode: 'development', // webpack2不支持这个属性
    module: {
      rules: [
        {
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: babelLoaderOptions,
            }],
            exclude: /node_modules/,
        },
        {
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            fallback: 'vue-style-loader',
                            use: [{
                                loader: 'css-loader',
                                options: {
                                    url: false,
                                    sourceMap: false,
                                },
                            }, {
                                loader: 'postcss-loader',
                                options: {
                                    // 在这里设置 sourcemap 为 true 会导致构建缓慢
                                    sourceMap: false,
                                    config: {
                                        path: path.resolve(__dirname, './postcss.config.js')
                                    }
                                },
                            }, {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: false,
                                    // 规定全局css变量。
                                    data: '$ASSETS_URL: "' +
                                    host + '/asset/' +
                                    '"; $STATIC_FILES_HOST: "' +
                                    host + '/file' +
                                    '"; $DEPLOY_TAG: "' +
                                    deployTag +
                                    '";',
                                }
                            }],
                        }),
                        js: {
                            loader: 'babel-loader',
                            options: babelLoaderOptions,
                        },
                    },
                },
            }]
        },
        {
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false,
                        sourceMap: false,
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: false,
                        config: {
                            path: path.join(__dirname, 'postcss.config')
                        },
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false,
                        data: '$ASSETS_URL: "' +
                            host + '/asset/' +
                            '"; $STATIC_FILES_HOST: "' +
                            host + '/file' +
                            '"; $DEPLOY_TAG: "' +
                            deployTag +
                            '";',
                    }
                }, {
                    loader: 'import-glob-loader',
                }]
            })
        },
        {
            test: /\.(html)$/,
                use: {
                loader: 'html-withimg-loader',
            }
        },
//         {
//             test: /\.(png|jpg)$/,
//             loader: 'url-loader',
//             options: {
//                 limit: 10000,
//                 mimetype: 'image/png',
//                 name: 'src/assets/[name].[ext]'
//             }
// 　　　　 }
      ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'app'),
        compress: false,
        port: 9000,
        hot: true,
        inline: false,
        clientLogLevel: 'warning',
        stats: {
            assets: false
        }
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            js: path.join(config.paths.src, 'js'),
            scss: path.join(config.paths.src, 'scss'),
            tpl: path.join(config.paths.src, 'tpl'),
            common: path.join(config.paths.src, 'js/common'),
            component: path.join(config.paths.src, 'js/component'),
            page: path.join(config.paths.src, 'js/page'),
            vendor: path.join(config.paths.src, 'vendor'),
            'v-component': path.join(config.paths.src, 'js/v-component'),
            'v-components': path.join(config.paths.src, 'js/v-components'), // 暂时兼容旧版项目
            'v-directive': path.join(config.paths.src, 'js/v-directive'),
            'v-filter': path.join(config.paths.src, 'js/v-filter'),
            'v-mixin': path.join(config.paths.src, 'js/v-mixin'),
            'v-plugin': path.join(config.paths.src, 'js/v-plugin'),
            'v-store': path.join(config.paths.src, 'js/v-store'),
            'site-config': path.join(config.paths.src, 'js/common/config.js'),
            'build-util': path.join(config.paths.src, 'js/common/build-util.js')
        }
    },
    plugins:[
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template: 'html-withimg-loader!' + path.resolve(__dirname, './app/wapindex.html'),
            filename:'index.html',
            chunks:['vendor', 'app']
        }),
    ]
}

