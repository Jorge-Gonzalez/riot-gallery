/*
 Simple Todo app. Port of React/Flux Todo app https://github.com/srackham/flux-backbone-todo
 */
'use strict';

import riot from 'riot';
import GalleryStore from './gallery-store.js';
import dispatcher from './dispatcher.js';
import './tags.js'

let galleryStore = new GalleryStore(dispatcher);
dispatcher.addStore(galleryStore);
riot.mount('justified-gallery', {store: galleryStore});
