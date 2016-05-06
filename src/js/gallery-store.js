// Store definition.
// Stores application logic and state that relate to a specific domain.
// Responds to relevant events emitted by the dispatcher and emmits
// change events to any listening views, so that they may react/redraw themselves.
'use strict';

import Riot from 'riot';
import gallData from '../galleries/galleries.json';
import justifiedLayout from 'justified-layout';
import _ from './utils';
import {createStyleSheet, addCSSRule} from './styleSheetTool';

export default function GalleryStore(event) {

  Riot.observable(this); // Riot provides our event emitter.

  this.CHANGED_EVENT = 'CHANGED_EVENT';

  this.dispatcher = event;

  let opts = gallData.config;

  const triggerChanged = () => {
    // Brute force update all.
    this.trigger(this.CHANGED_EVENT);
  };
  // Event handlers.
  this.one(event.GALLERY_INIT, (ev) => {
    init();
    event.trigger(event.GALLERY_LOAD);
  });

  this.on(event.GALLERY_LOAD, (id = opts.first) => {
    loadGalleryData(id);
    this.computeBoxesLayout();
    computeZoomBox();
    triggerChanged();
    console.log()
  });

  this.on(event.WINDOW_RESIZE, (ev) => {
    updateSizes();
    this.computeBoxesLayout();
    computeZoomBox();
    if (this.isZoomIn) event.trigger(event.IMG_ZOOM_OUT);
    triggerChanged();
  });

  this.on(event.IMAGE_ZOOM, (id) => {
    return this.isZoomIn
      ? event.trigger(event.IMG_ZOOM_OUT, id)
      : event.trigger(event.IMG_ZOOM_IN, id)
  });

  this.on(event.IMG_ZOOM_IN, (id) => {
    updateZoomYOffset();
    updateZoomStyle();
    handleZoom('in', id);
    triggerChanged();
  });

  this.on(event.IMG_ZOOM_OUT, (id) => {
    handleZoom('out', id);
    triggerChanged();
  });

  this.on(event.TRANSITION_END, (id) => {
    handleZoom('end', id);
    triggerChanged();
  });

  const init = () => {
    this.width = opts.width;
    createZoomStyle();
  }

  const loadGalleryData = (id) => {
    Object.assign(this, gallData.galleries.find( gall => gall.dir == id ));
    this.path = opts.path + this.dir;
  }

  const updateSizes = () => {
    let winWidth = _.getWindowWidth();
    this.width = opts.width < winWidth ? opts.width : winWidth - 30;
    console.log(this.width)
    this.clientHeight = _.getWindowHeight();
  }

  const computeZoomBox = () => {

    let zoomBox = this.zoomBox = {};
    zoomBox.width = opts.zoomWidth < this.width ? opts.zoomWidth : this.width - 20;
    zoomBox.height = opts.zoomHeight < this.clientHeight ? opts.zoomHeight : this.clientHeight -40;
    zoomBox.top = (this.height - zoomBox.height)/2;
    zoomBox.left = (this.width - zoomBox.width)/2;
  }

  const updateZoomYOffset = () => {
    let room = _.getWindowHeight() < this.height ? _.getWindowHeight() : this.height;
    this.zoomBox.top = (room - this.zoomBox.height) / 2 + _.getPageYOffset() -10;
  }

  const handleZoom = (type, id) => {

    id = id || this.zoomId;
    let box = this.entries.find(entry => entry.id == id);

    if (type == 'end') {
      if (!this.isZoomIn) box.toFront = false;
      return;
    }
    
    let isIn = type == 'in' ? true : false;
    if (isIn) box.toFront = isIn;

    this.isZoomIn = isIn;
    this.zoomId = isIn ? id : null;

    box.zoomIn = isIn;
    this.showModal = isIn;
  }

  const createZoomStyle = () => {
    // A styleSheet for the dynamic styles.
    this.styleSheet = createStyleSheet({id: "this-styles"});
    // Dynamic css rule for the zoom box.
    this.zoomCSSRule = addCSSRule('.zoomin {}', this.styleSheet);
  }

  // Manual update zoom style box props: top, left, width, height.
  const updateZoomStyle = () => {
    for (var prop in this.zoomBox){
      this.zoomCSSRule.style.setProperty(prop, this.zoomBox[prop]+'px', 'important');
    }
  }
}

GalleryStore.prototype.computeBoxesLayout = function () {
  let geometry = justifiedLayout(this.ratios, {containerWidth: this.width, targetRowHeightTolerance: .25});
  this.entries = this.entries.map( (entry, idx) => ({ ...entry, ...geometry.boxes[idx], idx:idx, zoomIn:false, toFront:false}) );
  this.height = geometry.containerHeight;
}
