// vue.config.js
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    sitemap: {
      // (1) Your live site’s root URL — required
      baseURL: 'https://linelearning.pages.dev',                  
      // (2) Provide either `urls` for static paths…
      urls: [
        '/', '/nrz', '/rz', '/ami', '/manchester', '/differential-manchester'
      ],
      // (3) Optionally control where the file is written (default = your dist/)
      // outputDir: 'dist',   // ← you can omit, uses Vue’s outputDir by default
      // (4) Other optional flags:
      productionOnly: false,   // generate even in dev builds
      trailingSlash: false,    // do not add “/” to end of URLs
      hashMode: false,         // not using hash-based routing
      pretty: true             // nicely indent the XML
    }
  }
});
