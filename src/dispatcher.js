// RiotControl dispatcher.
// https://github.com/jimsparkman/RiotControl

module.exports = {

  // Dispatcher actions.
  GALLERY_INIT: 'GALLERY_INIT',
  GALLERY_LOAD: 'GALLERY_LOAD',
  GALLERY_LOADED: 'GALLERY_LOADED',
  IMAGE_CLICK: 'IMAGE_CLICK',
  IMG_ZOOM_IN: 'IMG_ZOOM_IN',
  IMG_ZOOM_OUT: 'IMG_ZOOM_OUT',
  WINDOW_RESIZE: 'WINDOW_RESIZE',
  TRANSITION_END: 'TRANSITION_END',
  SWITCH_IMAGE: 'SWITCH_IMAGE',

  _stores: [],

  addStore (store) {
    this._stores.push(store)
  },

  trigger () {
    let args = [].slice.call(arguments)
    // console.log('dispatcher: trigger: ' + args);
    this._stores.forEach(function (el) {
      el.trigger.apply(null, args)
    })
  },

  on (ev, cb) {
    this._stores.forEach(function (el) {
      el.on(ev, cb)
    })
  },

  off (ev, cb) {
    this._stores.forEach(function (el) {
      if (cb) el.off(ev, cb)
      else el.off(ev)
    })
  },

  one (ev, cb) {
    this._stores.forEach(function (el) {
      el.one(ev, cb)
    })
  }

}
