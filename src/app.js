/*
 Image gallery auto justified using Flickr's justified-layout,
 Riot app, dispatcher added inspired by Flux.
 */
'use strict'

require('./css/main.css') // css next no me esta gustando por el momento

const loadPolyfills = require('./lib/loadPolyfills')

const riot = require('riot')
const GalleryStore = require('./stores/portfolio-store')
const dispatcher = require('./dispatcher')
// tags
require('raw')
require('img-comp')
require('box')
require('container')
require('modal')
require('galleries-menu')
require('justified-gallery')

function main (err) {
  if (err) throw err

  let galleryStore = new GalleryStore(dispatcher)
  dispatcher.addStore(galleryStore)

  riot.mount('justified-gallery', {store: galleryStore})
}

loadPolyfills(['Array.prototype.find', 'Object.assign', 'Promise'], main)
