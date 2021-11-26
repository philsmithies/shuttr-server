const api_key = process.env.GOOGLEMAPS_API;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "index.js",
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "./template.html",

      // Pass the full url with the key!
      apiUrl: `https://maps.googleapis.com/maps/api/js?key=${api_key}`,
    }),
  ],
};
