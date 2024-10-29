function parseQueryString(str) {
  return str.split('&').reduce((c, pair) => {
    const [k, v] = pair.split('=');
    return { ...c, [k]: decodeURIComponent(v) };
  }, {});
}

module.exports = parseQueryString;
