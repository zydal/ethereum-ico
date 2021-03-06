var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = function (env) {
    return [{
        target: 'node',
        entry: {
            'app': './src/server/app.js',
            // 'api': './src/server/api.js',
            'admin': './src/server/admin.js',
            // 'job': './src/server/job.js'

        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].js',
            //publicPath: 'https://cdn.geekblr.com/',
            // sourceMapFilename: '[name].map'
        },
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                //exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                query: {
                    minimize: false
                }
            },
            {
                test: /\.tpl$/,
                loader: 'html-loader',
                query: {
                    minimize: false
                }
            }

            ]
        },
        //externals: [/^(?!\.|\/).+/i,],
        externals: [nodeExternals()],
        plugins: [
            new CleanWebpackPlugin(['dist', 'build'], {
                root: __dirname,
                verbose: true,
                dry: false
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': { NODE_ENV: JSON.stringify(env) }
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                compress: true,
                minimize: true,
                // mangle: {
                //     screw_ie8: true,
                //     keep_fnames: true
                // },
                comments: false
            })
        ]
    },

    //www

    {
        entry: {
            'www/js/app': './src/www/app.js',
            //'www/css/layout': './src/www/css/layout.css',
            // 'api': './src/server/api.js',
            // 'admin': './src/server/admin.js',
            // 'job': './src/server/job.js'

        },
        output: {
            path: path.join(__dirname, './dist'),
            //filename: '[name].[hash:8].js',
            filename: '[name].js',
            publicPath: 'https://viralchain.net/',
            //sourceMapFilename: '[name].map'
        },
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // presets: ['es2015', "stage-2"],
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this nessessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    },
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },

            {
                test: /\.json$/,
                loader: 'json-loader'

            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",

                })
                //use: ['style-loader', 'css-loader'],
                // options: {
                //     minimize: true
                // },

            },

            // {
            //     test: /\.(png|jpg|gif|svg)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[ext]?[hash]'
            //     }
            // },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }
            ]
        },
        //externals: [/^(?!\.|\/).+/i,],
        //devtool: '#source-map',
        plugins: [

            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': { NODE_ENV: JSON.stringify(env) }
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                'window.Tether': "tether",
                'Tether': "tether",
                Popper: ['popper.js', 'default']
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                compress: true,
                minimize: true,
                comments: false
            }),
            new ExtractTextPlugin({
                //filename: '[name].css',
                filename: (getPath) => {
                    return getPath('[name].css').replace('js', 'css');
                    //return getPath('[name].[hash:8].css').replace('js', 'css');
                },
                allChunks: true

            }),
            new HtmlWebpackPlugin({
                //filename: '[name].css',
                // title: "GEEKBLR",
                filename: 'views/index.html',
                template: 'src/server/views/index.html',
                hash: true,
                minify: {
                    collapseWhitespace: true,
                    //preserveLineBreaks: true,                    
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    removeEmptyAttributes: true
                }

            }),



            new CopyWebpackPlugin([

                // { from: 'src/www/favicon/**/*', to:'/www/favicon/' },
                {
                    context: 'src/www/favicon',
                    from: '**/*',
                    to: './www/favicon'
                },

            ], {
                    // ignore: [
                    //     // Doesn't copy any files with a txt extension    
                    //     '*.txt',

                    //     // Doesn't copy any file, even if they start with a dot
                    //     '**/*',

                    //     // Doesn't copy any file, except if they start with a dot
                    //     { glob: '**/*', dot: false }
                    // ],

                    // By default, we only copy modified files during
                    // a watch or webpack-dev-server build. Setting this
                    // to `true` copies all files.
                    copyUnmodified: true
                })
        ]
    },


    //admin

    {
        entry: {
            'admin/js/app': './src/admin/app.js',
            //'www/css/layout': './src/www/css/layout.css',
            // 'api': './src/server/api.js',
            // 'admin': './src/server/admin.js',
            // 'job': './src/server/job.js'

        },
        output: {
            path: path.join(__dirname, './dist'),
            //filename: '[name].[hash:8].js',
            filename: '[name].js',
            publicPath: 'https://adm.viralchain.net/',
            //sourceMapFilename: '[name].map'
        },
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // presets: ['es2015', "stage-2"],
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this nessessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    },
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },

            {
                test: /\.json$/,
                loader: 'json-loader'

            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",

                })


            },


            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }
            ]
        },
        //externals: [/^(?!\.|\/).+/i,],
        //devtool: '#source-map',
        plugins: [

            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': { NODE_ENV: JSON.stringify(env) }
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                'window.Tether': "tether",
                'Tether': "tether",
                Popper: ['popper.js', 'default']
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                compress: true,
                minimize: true,
                comments: false
            }),
            new ExtractTextPlugin({
                //filename: '[name].css',
                filename: (getPath) => {
                    return getPath('[name].css').replace('js', 'css');
                    //return getPath('[name].[hash:8].css').replace('js', 'css');
                },
                allChunks: true

            }),
            new HtmlWebpackPlugin({
                //filename: '[name].css',
                // title: "GEEKBLR",
                filename: 'views/admin.html',
                template: 'src/server/views/admin.html',
                hash: true,
                minify: {
                    collapseWhitespace: true,
                    //preserveLineBreaks: true,                    
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    removeEmptyAttributes: true
                }

            }),




        ]
    }



    ]

}