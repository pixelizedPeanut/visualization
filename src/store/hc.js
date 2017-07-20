import hc from 'highcharts'

export default class Chart {
  constructor (id, data) {
    this.data = data || []
    this.chart = null
    this.locator = id || 'hc'
  }

  render (data, series, options) {
    data = data || this.data
    series = series || data.map(i => {
      return {
        name: i.label,
        data: i.data
      }
    })

    // move some of this in options
    let defaults = {
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      yAxis: {
        title: {
          text: 'Page Load Time'
        },
        labels: {
          format: '{value}s'
        }
      },
      xAxis: {
        title: {
          text: ''
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%d-%b'
        },
        crosshair: true
      },
      title: false,
      series: series
    }

    options = Object.assign(defaults, options)

    hc.setOptions({
      chart: {
         style: {
           fontFamily: 'sans-serif'
         }
       }
     })

    this.chart = hc.chart(this.locator, options)
  }

  addSeries (series) {
    if (this.chart) {
      this.chart.addSeries({
        name: series.label,
        data: series.data
      })
    }
  }
}
