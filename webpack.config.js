const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin =require('extract-text-webpack-plugin');
const path =require('path');
const webpack = require('webpack');

let babelLoaderOptions = {
    "presets": ["env", "stage-2"],
    "plugins": ["transform-runtime"]
}
let host = '//localhost:9001'
let deployTag = 'KYLXL4u'
let config = {
    paths: {
        src: path.resolve(__dirname,"app/src"),
    }
}
const excludeRegexStr = `node_modules(?!(\/|\\\\)(mfex-core))`;
const excludeRegex = new RegExp(excludeRegexStr);
module.exports = {
    entry: {
        vendor: ["./app/src/js/vendor"],
        app: ["./app/src/js/app"],
    },
    output: {
        path: path.resolve(__dirname,"app/dist"),
        publicPath: "",
        filename: 'js/[name].[hash:8].bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'app'), // 非从webpack打包的资源从这里加载
        compress: false, // 是否压缩
        port: 9001,
        hot: true, //模块热替换 new webpack.HotModuleReplacementPlugin(),
        inline: true, // 是否启用自动刷新
        // 定义打印信息的规则
        stats: {
            publicPath: true,
            // 打印模块的信息
            modules: false,
            // 显示资源的文件信息
            assets: false,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },    
        proxy: {
            "/Api": {
              target: "http://act.mama.cn",
              changeOrigin: true,
              secure: false,
            }
        }
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
            exclude: excludeRegex,
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
      ]
    },
    resolve: {
        // 定义扩展名
        extensions: ['.js', '.vue'],
        // 定义引用路径的别名
        // modules: 默认查找路径下的node_modules
        alias: {
            js: path.join(config.paths.src, 'js'),
            scss: path.join(config.paths.src, 'scss'),
            tpl: path.join(config.paths.src, 'tpl'),
            common: path.join(config.paths.src, 'js/common'),
            component: path.join(config.paths.src, 'js/component'),
            page: path.join(config.paths.src, 'js/page'),
            vendor: path.join(config.paths.src, 'vendor'),
            'v-component': path.join(config.paths.src, 'js/v-component'),
            'v-components': path.join(config.paths.src, 'js/v-components'),
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': "'development'"
        }),
        new ExtractTextPlugin("[name].[hash:8].css"),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './app/index.html'),
            filename:'index.html',
            inject: true, // 是否注入css和js
            alwaysWriteToDisk: true,
            chunks:['vendor', 'app'], // 默认全部加载
        }),
        // new HtmlWebpackPlugin({  // Also generate a test.html
        //     filename: 'style.html',
        //     template: path.resolve(__dirname, './build/tpl/style.tpl'),
        //     alwaysWriteToDisk: true,
        //     inject: false,
        // }),
        
    ]
}

