const GalleryStore = require('./gallery-store.js')
const inherits = require('../lib/inherits')

export default function PortfolioStore (dispatcher) {
  GalleryStore.call(this, dispatcher)
}

inherits(PortfolioStore, GalleryStore)

PortfolioStore.prototype.computeBoxesLayout = function () {
  // console.log(this.ratios, ' - ', this.width)
  this.ratios = this.entries.length === 5 && this.width >= 1055
    ? [1.33, 1.33, 1.21, 1.21, 1.21]
    : [1.33, 1.33, 1.33, 1.33, 1.33]

  this.fullWidthCadence = this.entries.length === 5 && this.width > 663 && this.width <= 875
    ? 2
    : false

  PortfolioStore.super_.prototype.computeBoxesLayout.call(this)
}
