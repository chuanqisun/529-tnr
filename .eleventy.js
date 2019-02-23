module.exports = eleventyConfig => {

  eleventyConfig.addFilter("stringify", value => JSON.stringify(value));

  eleventyConfig.addFilter("dayOfWeek", value => {
    const date = new Date(value*1000);
    const days = ['Su','M','Tu','W','Th','F','Sa'];
    return days[date.getDay()];
  });

  eleventyConfig.addFilter("localeTime", value => (new Date(value*1000)).toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit', timeZone: "America/Los_Angeles"}))

  eleventyConfig.addFilter("isoDate", value => {
    const date = new Date(value*1000);
    return date.toISOString();
  });

  eleventyConfig.addFilter("roundToIntTemperatureF", value => `${Math.round(value)}°`);

  eleventyConfig.addFilter("friendlyPrecipitationType", value => value ? value : 'precipitation');

  eleventyConfig.addFilter("decimalToPercentage", value => `${Math.round(100 * value)}%`);

  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: "src",
      output: "dist",
      data: "data",
      includes: "includes",
    },
    passthroughFileCopy: true
  }
}