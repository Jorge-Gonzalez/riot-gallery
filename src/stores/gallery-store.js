// Store definition.
// Stores application logic and state that relate to a specific domain.
// Responds to relevant events emitted by the dispatcher and emmits
// change events to any listening views, so that they may react/redraw themselves.

const Riot = require('riot')
const config = require('../../data/config.json')
const justifiedLayout = require('justified-layout')
const getJSON = require('../lib/getJSON')
const view = require('../lib/windowSize')
const {createStyleSheet, addCSSRule} = require('../lib/styleSheetTool')
const {IN, OUT, END, NEXT, PREV} = require('../constants')

export default function GalleryStore (event) {
  Riot.observable(this) // Riot provides our event emitter.

  this.CHANGED_EVENT = 'CHANGED_EVENT'
  this.dispatcher = event
  this.config = config

  const triggerChanged = () => {
    // Brute force update all.
    this.trigger(this.CHANGED_EVENT)
  }

  // Event handlers.
  this.one(event.GALLERY_INIT, () => {
    init()
    setRoutes()
  })

  this.on(event.GALLERY_LOAD, (id) => {
    loadGalleryData(id)
  })

  this.on(event.GALLERY_LOADED, () => {
    computeLayout()
    triggerChanged()
  })

  this.on(event.WINDOW_RESIZE, () => {
    computeLayout()
    if (this.isZoomIn) event.trigger(event.IMG_ZOOM_OUT)
    triggerChanged()
  })

  this.on(event.IMAGE_CLICK, (id) => {
    if (this.isZoomEnabled) {
      return this.isZoomIn
        ? event.trigger(event.IMG_ZOOM_OUT, id)
        : event.trigger(event.IMG_ZOOM_IN, id)
    }
  })

  this.on(event.IMG_ZOOM_IN, (id) => {
    updateZoomYOffset()
    updateZoomStyle()
    handleZoom(IN, id)
    triggerChanged()
  })

  this.on(event.IMG_ZOOM_OUT, (id) => {
    handleZoom(OUT, id)
    triggerChanged()
  })

  this.on(event.TRANSITION_END, (id) => {
    handleZoom(END, id)
    triggerChanged()
  })

  this.on(event.SWITCH_IMAGE, (img) => {
    zoomNext(img)
  })

  const init = () => {
    this.width = config.width
    createZoomStyle()
  }

  // ------------------------------------------------------------

  const setRoutes = () => {
    this.routes = config.galleries.map(gall => gall.dir)
    Riot.route(`/${this.config.route}/*`, selectGallery)
    Riot.route.start(true)
  }

  const selectGallery = (gallery) => {
    if (this.routes.indexOf(gallery) !== -1) {
      event.trigger(event.GALLERY_LOAD, gallery)
    }
  }

  // Load -- data
  const loadGalleryData = (id) => {
    getJSON('/assets/galleries/' + id + '.json', loadGallery)
  }

  const loadGallery = (err, galleryData) => {
    if (err) throw err
    Object.assign(this, galleryData)
    this.path = config.path + this.dir
    this.zoomWidth = this.zoomWidth || config.zoomWidth
    this.zoomHeight = this.zoomHeight || config.zoomHeight
    event.trigger(event.GALLERY_LOADED)
  }

  // ------------------------------------------------------------
  // Esto puede ir en un componente zoom-box

  const computeLayout = () => {
    updateSizes()
    this.computeBoxesLayout()
    if (ableToZoom()) computeZoomBox()
  }

  // Window size calculations helper
  const updateSizes = () => {
    let winWidth = view.getWindowWidth()
    this.width = config.width < winWidth ? config.width : winWidth - 30
    this.clientHeight = view.getWindowHeight()
  }
  // Zoom -- calculations
  const computeZoomBox = () => {
    let zoomBox = this.zoomBox = {}
    zoomBox.width = this.zoomWidth < this.width ? this.zoomWidth : this.width - 20
    zoomBox.height = this.zoomHeight < this.clientHeight ? this.zoomHeight : this.clientHeight - 40
    zoomBox.top = (this.height - zoomBox.height) / 2
    zoomBox.left = (this.width - zoomBox.width) / 2
  }
  // Zoom -- calculations
  const updateZoomYOffset = () => {
    let room = view.getWindowHeight() < this.height ? view.getWindowHeight() : this.height
    this.zoomBox.top = (room - this.zoomBox.height) / 2 + view.getPageYOffset() - 10
  }
  // Zoom -- zooms out the current image if any an zooms in the nex or previous
  const zoomNext = (direction) => {
    const zoomByIndex = (idx) => event.trigger(event.IMG_ZOOM_IN, this.entries[idx].id)
    let index = 0
    if (this.isZoomIn) {
      // Get index of current image.
      index = this.entries.findIndex(entry => entry.id === this.zoomId)
      // Zoom outs current.
      event.trigger(event.IMG_ZOOM_OUT, this.zoomId)
      // get the index to be zoomed
      index = direction === NEXT ? ++index : direction === PREV ? --index : 0

      if (index >= 0 && index < this.entries.length) {
        // zoomin the next image when the zoomouttransition finishes.
        this.one(event.TRANSITION_END, () => {
          zoomByIndex(index)
        })
      }
    // If no image is zoomed, zooms the first one.
    } else if (direction === NEXT) zoomByIndex(index)
  }
  // Zoom -- toggling css and keeping state
  const handleZoom = (type, id) => {
    id = id || this.zoomId
    if (!id) return false

    let box = this.entries.find(entry => entry.id === id)

    switch (type) {
      case IN:
        this.zoomId = id
        this.isZoomIn = true
        this.showModal = true
        box.toFront = true
        box.zoomIn = true
        return true
      case OUT:
        // this.zoomId = null
        this.isZoomIn = false
        this.showModal = false
        box.zoomIn = false
        return true
      case END:
        if (!this.isZoomIn) {
          box.toFront = false
          this.zoomId = null
        }
        return true
      default:
        return console.error('Zoom types are: "IN", "OUT", "END".')
    }
  }

  // Zoom -- dynamic style
  const createZoomStyle = () => {
    // A styleSheet for the dynamic styles.
    this.styleSheet = createStyleSheet({id: 'this-styles'})
    // Dynamic css rule for the zoom box.
    this.zoomCSSRule = addCSSRule('.zoomin {}', this.styleSheet)
  }

  // Zoom -- Manual update zoom style box props: top, left, width, height.
  const updateZoomStyle = () => {
    for (var prop in this.zoomBox) {
      this.zoomCSSRule.style.setProperty(prop, this.zoomBox[prop] + 'px', 'important')
    }
  }

  // Zoom -- disable the zoom in small devices.
  const ableToZoom = () => (this.isZoomEnabled = this.width) > 663
}

// Layout -- images using justifiedLayout
GalleryStore.prototype.computeBoxesLayout = function () {
  let geometry = justifiedLayout(this.ratios,
    {
      containerWidth: this.width,
      fullWidthBreakoutRowCadence: this.fullWidthCadence
    })
  this.entries = this.entries
    .map((entry, idx) => ({...entry, ...geometry.boxes[idx], idx, zoomIn: false, toFront: false}))

  this.height = geometry.containerHeight
}
