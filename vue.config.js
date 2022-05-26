const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  runtimeCompiler: true,
  publicPath:
    process.env.NODE_ENV === "production" ? "/\n" + "vue-cesium-example/" : "/",
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: "node_modules/cesium/Build/Cesium/Workers", to: "Workers" },
          {
            from: "node_modules/cesium/Build/Cesium/ThirdParty",
            to: "ThirdParty"
          },
          { from: "node_modules/cesium/Build/Cesium/Assets", to: "Assets" },
          { from: "node_modules/cesium/Build/Cesium/Widgets", to: "Widgets" }
        ]
      }),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify("")
      })
    ],
    module: {
      unknownContextCritical: false,
      unknownContextRegExp: /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/
    }
  },
  devServer: {
    proxy: {
      "/api/": {
        target: "http://124.221.135.91:8000/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
