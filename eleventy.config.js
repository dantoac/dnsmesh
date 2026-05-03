import { I18nPlugin } from "@11ty/eleventy";
import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_components/**/*.webc",
  });

  eleventyConfig.addPlugin(I18nPlugin, {
    defaultLanguage: "en",
    errorMode: "strict",
  });

  eleventyConfig.addPassthroughCopy({ "src/styles.css": "styles.css" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addWatchTarget("src/styles.css");
  eleventyConfig.addWatchTarget("src/assets");

  const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";
  eleventyConfig.addGlobalData("basePath", pathPrefix.endsWith("/") ? pathPrefix : pathPrefix + "/");
  eleventyConfig.addGlobalData("buildTime", String(Date.now()));

  return {
    pathPrefix,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["webc", "njk", "md", "html"],
    htmlTemplateEngine: "webc",
    markdownTemplateEngine: "webc",
  };
}
