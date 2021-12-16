const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../apps"),
      "@common": path.resolve(__dirname, "../common")
    }
  }
};
