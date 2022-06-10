const configureWebpack = require("./config/webpackconfig");
const process = require("process");
const config = require("./config/app-config");
const argv = require("minimist")(process.argv.slice(2));
const chalk = require("chalk");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;

const appName = argv.app;

if (!appName) {
	console.log(chalk.red("请输入项目名称！"));
	process.exit(0);
}

const pageConfig = require("./config/pageConfig")(appName);
const appConfig = config[appName] || config["default"];

module.exports = {
	pages: pageConfig.pages,
	outputDir: pageConfig.outputDir,
	publicPath: "./",
	configureWebpack: configureWebpack,
	transpileDependencies: ["vue-echarts", "resize-detector"],
	chainWebpack: config => {
		config.plugin("copy").use(require("copy-webpack-plugin"), [
			[
				{
					from: pageConfig.publicDir,
					to: pageConfig.outputDir,
					toType: "dir"
				}
			]
		]);

		config.plugin("CompressionPlugin").use(
			new CompressionPlugin({
				test: /\.js$|\.png$|\.jpg$|\.mp4$|\.css/,
				threshold: 10240, // 大于10k进行压缩
				minRatio: 0.8, // 压缩率小于0.8才会压缩
				deleteOriginalAssets: false
			})
		);

		// 生成代码分析报告
		// config.plugin("bundleAnalyzerPlugin").use(new BundleAnalyzerPlugin());
	},
	css: {
		loaderOptions: {
			less: {
				lessOptions: {
					// If you are using less-loader@5 please spread the lessOptions to options directly
					modifyVars: {
						"primary-color": "#1DA57A",
						"link-color": "#1DA57A",
						"border-radius-base": "2px"
					},
					javascriptEnabled: true
				}
			}
		}
	},
	devServer: {
		disableHostCheck: true,
		port: appConfig.port, // 端口号
		host: "0.0.0.0", // 本地和局域网
		https: false, // 是否启动https
		open: false // 自动打浏览器
		// proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
	},
	productionSourceMap: false
};
