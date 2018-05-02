export {
  parseConversions,
  parseRevenue,
  parsePlt,
  endpointValidator,
  last7Days
}

function parseConversions (data) {
  return data.results.map(r => ([r.key, r.conversion]))
}

function parseRevenue (data) {
  return data.results.map(r => ([r.key, parseInt(r.revenuegbp / 100000, 10)]))
}

function parsePlt (data) {
  return data.chart[0].data.map(r => ([r.x, r.y]))
}

function endpointValidator (url, data) {
  switch (url) {
    case 'conversionmetricsbytime':
      return data.results.length > 0

    case 'loadspeedpercentile':
      return data.chart[0]
  }
}

function last7Days () {
  const before = parseInt(new Date().getTime() / 1000 - (7 * 24 * 3600), 10)
  const now = parseInt(new Date().getTime() / 1000, 10)
  return `${before}_${now}`
}
