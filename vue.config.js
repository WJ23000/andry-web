const configureWebpack = require("./config/webpackconfig");
const process = require("process");
const config = require("./config/app-config");
const argv = require("minimist")(process.argv.slice(2));
const chalk = require("chalk");

// console.log("process.argv",argv);

const appName = argv.app;

if (!appName) {
	console.log(chalk.red("请输入项目名称！"));
	process.exit(0);
}

const pageConfig = require("./config/pageConfig")(appName);
const appConfig = config[appName] || config["default"];

// process.exit(0);

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
