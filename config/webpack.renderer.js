const path = require('path');
const webpack = require('webpack');
const autoPreprocess =  require('svelte-preprocess');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	...baseConfig,
	target:"electron-renderer",
	//mode: 'development',
	entry: [path.join(process.cwd(),'./src/renderer/index.js')],
	output: {
		filename: 'renderer.js',
		libraryTarget: 'umd',
		path: path.join(process.cwd(),'./dist/electron/renderer'),
		publicPath:''
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename:'index.html',
			template: path.resolve(__dirname, '../src/renderer/index.ejs'),
			nodeModules: process.env.NODE_ENV !== 'production'
			? path.resolve(__dirname, '../node_modules')
			: false
		}),
		new webpack.DefinePlugin({
			'__static': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
		}),
		new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[id].css'
    }),
		new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    })
		// new VueLoaderPlugin()
	],
	node: {
		__dirname: process.env.NODE_ENV !== 'production',
		__filename: process.env.NODE_ENV !== 'production'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
                include: [path.resolve(process.cwd(), 'src/renderer')],
                exclude: /node_modules/,
				loader: 'babel-loader',
				//enforce: 'pre',
				options: {
					comments:false,
					plugins: [
						'@babel/plugin-syntax-dynamic-import',
						"@babel/plugin-transform-runtime",
						["@babel/plugin-proposal-decorators",{ "legacy": true }]
					],
					presets: [
							
							[
							"@babel/preset-env"
							,{
								modules:false
							}
							]
						
					]
				}
			},
			{
				test: /\.(svelte|html)$/,
				use: {
					loader: 'svelte-loader',
					options: {
						dev: process.env.NODE_ENV === 'development',
						hydratable: true,
						hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
						preprocess: autoPreprocess()
					}
				}
			},
			
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				exclude: [path.join(__dirname, '../src/renderer/icons')],
				use: {
				  loader: 'url-loader',
				  query: {
					limit: 10000,
					name: 'imgs/[name]--[folder].[ext]'
				  }
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
				  limit: 10000,
				  name: 'media/[name]--[folder].[ext]'
				}
			},
			{
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                  './src/renderer/theme',
                  './node_modules',
                ]
              }
            }
          }
        ]
      },
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: {
				  loader: 'url-loader',
				  query: {
					limit: 10000,
					name: 'fonts/[name]--[folder].[ext]'
				  }
				}
			}
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},
	resolve: {
		alias: {
		  '~': path.join(__dirname, '../src/renderer')
		},
		extensions: ['.js', '.json', '.css', '.scss', '.node', ".ts", ".svelte"]
	  },
};
