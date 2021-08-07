const withTM = require('next-transpile-modules')(['d3-scale', 'd3-format', 'd3-time']);

module.exports = withTM({
  webpack5: false
});
