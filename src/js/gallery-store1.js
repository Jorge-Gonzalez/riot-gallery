// TodoStore definition.
// Flux stores house application logic and state that relate to a specific domain.
// The store responds to relevant events emitted by the flux dispatcher.
// The store emits change events to any listening views, so that they may react
// and redraw themselves.
'use strict';

import Riot from 'riot';
import gallData from '../galleries/galleries.json';
import justifiedLayout from 'justified-layout';

export default function GalleryStore(dispatcher) {


  Riot.observable(this); // Riot provides our event emitter.
  this.CHANGED_EVENT = 'CHANGED_EVENT';

  this.dispatcher = dispatcher;

  let opts = {
    first: 'Popular_Pensiones_2007',
    path: '/assets/galleries/'
  };

  const triggerChanged = () => {
    // Brute force update all.
    this.trigger(this.CHANGED_EVENT);
  };

  // Event handlers.
  this.on(dispatcher.LOAD_GALLERY, (id = opts.first) => {

    let gallery = this.gallery = gallData.find( gallery => gallery.dir == id );
    let geometry = justifiedLayout(gallery.ratios, {containerWidth: 1060});
    
    gallery.entries = gallery.entries.map( (entry, idx) => ({ ...entry, ...geometry.boxes[idx] }) );
    
    gallery.height = geometry.containerHeight;
    gallery.path = opts.path + gallery.dir;

    triggerChanged();
  });

  this.on(dispatcher.IMG_ZOOM_IN, (id) => {
    
    triggerChanged();
  });

  this.on(dispatcher.IMG_ZOOM_OUT, (id) => {
    
    triggerChanged();
  });

  this.on(dispatcher.IMG_TOGGLE, (id) => {
    
    triggerChanged();
  });

}
