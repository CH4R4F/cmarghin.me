const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("./src/assets/js");
  eleventyConfig.addPassthroughCopy("./src/media");
  eleventyConfig.addPassthroughCopy("./src/blogs");

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};