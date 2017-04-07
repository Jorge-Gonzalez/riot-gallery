// borrowed from: gascrolldepth.js | v0.9 Licensed under the MIT and GPL licenses.
// Copyright (c) 2015 Rob Flaherty (@robflaherty), Leigh McCulloch (@___leigh___)
module.exports = {
  getDocumentHeight () {
    return Math.max(
      document.documentElement.scrollHeight, document.body.scrollHeight,
      document.documentElement.offsetHeight, document.body.offsetHeight,
      document.documentElement.clientHeight
    )
  },
  getWindowWidth () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  },
  getWindowHeight () {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  },
  getPageYOffset () {
    return window.pageYOffset || (document.compatMode === 'CSS1Compat' ? document.documentElement.scrollTop : document.body.scrollTop)
  },
  getElementYOffsetToDocumentTop (element) {
    return element.getBoundingClientRect().top + this.getPageYOffset()
  }
}
