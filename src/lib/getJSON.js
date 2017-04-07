const isFileProtocol = (u) => /^file:\/\//i.test(u)
const isValidStatus = (s) => (s >= 200 && s < 300) || s === 304
const getErrObj = (err, xhr) => Object.assign(new Error(err), xhr)

/**
 * Super simple ajax get request of a json resource.
 *
 * @param      {String}    url     The url.
 * @param      {Function}  cb      The callback.
 */
module.exports = function getJSON (url, callback) {
  let xhr = new window.XMLHttpRequest()

  let aborted
  let xhrAbort = xhr.abort
  xhr.abort = () => (aborted = true) && xhrAbort.call(xhr)

  xhr.open('GET', url, true)

  xhr.onreadystatechange = () => {
    if (!aborted && xhr.readyState === 4) {
      return isValidStatus(xhr.status) || isFileProtocol(url)
        ? callback(false, JSON.parse(xhr.responseText))
        : callback(getErrObj('Server response: ' + xhr.statusText, xhr))
    }
  }

  xhr.onerror = (e) => callback(getErrObj('Request failed.', xhr))

  xhr.send(null)
}
