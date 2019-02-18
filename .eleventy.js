module.exports = eleventyConfig => {

  eleventyConfig.addFilter("stringify", value => JSON.stringify(value));

  return {
    dir: {
      input: "src",
      output: "dist",
      data: "data",
      includes: "includes",
    }
  }
}