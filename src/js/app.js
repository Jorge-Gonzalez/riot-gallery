/*
 Image gallery auto justified using Flickr's justified-layout,
 Riot app, dispatcher added inspired by Flux.
 */
'use strict';

require('../css/main.css'); // css next no me esta gustando por el momento

import riot from 'riot';
import GalleryStore from './gallery-store.js';
import dispatcher from './dispatcher.js';
import '../tags/justified-gallery.tag'
// import './tags.js'

let galleryStore = new GalleryStore(dispatcher);
dispatcher.addStore(galleryStore);
riot.mount('justified-gallery', {store: galleryStore});
