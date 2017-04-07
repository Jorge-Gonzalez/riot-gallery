/**
 * Loads polyfills.
 *
 * @param      {Array}     expectedFeatures  The expected features
 * @param      {Function}  loadHandler       The callback
 */
module.exports = function loadPolyfills (expectedFeatures, loadHandler) {
  // If any features need to be polyfilled.
  if (expectedFeatures.some(isNotFunction)) {
    // List the features that need to be polyfilled.
    let missingFeatures = expectedFeatures.filter(isNotFunction)
    // Create the url with 'ua' set to a supported browser and 'always'
    let src = 'https://polyfill.io/v2/polyfill.min.js?features=' + missingFeatures.join(',') + '&flags=gated,always&ua=chrome/50'
    // Create a script tag, load the polyfills in it and add it to head.
    loadScript(src, loadHandler)
  } else {
    // If no polyfills are required, invoke the app.
    loadHandler()
  }
}

// For now just cheking if the feature is not a function.
// TODO A list to diferenciate exeptions and create filters to handle them.

/**
 * Determines if the requested feature is not a function.
 *
 * @param      {global property}   feature  The browser feature
 * @return     {boolean}           True if not function, False otherwise.
 */
const isNotFunction = feature => typeof feature.split('.').reduce((global, prop) => global[prop], window) !== 'function'

/**
 * Loads a script in the head element, and calls back when loaded.
 *
 * @param      {string}    url     The source url
 * @param      {Function}  cb    The callback
 */
function loadScript (url, cb) {
  var script = document.createElement('script')
  script.src = url
  script.onload = () => cb()
  script.onerror = () => cb(new URIError('Failed to load script ' + url))
  document.head.appendChild(script)
}
