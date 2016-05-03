
riot.tag2('justified-gallery', '<div data-is="container" riot-style="height: {store.height}px; width: {store.width}px;" entries="{store.entries}" path="{store.path}" dispatcher="{store.dispatcher}" is_modal="{store.showModal}"></div> <div id="desciption" riot-style="width: {store.width}px"> <h3 class="header">{store.name}</h3> <raw html="{store.desc.es}"></raw> </div>', 'justified-gallery,[riot-tag="justified-gallery"],[data-is="justified-gallery"]{ margin: 0 auto; display: table; }', '', function(opts) {
var _this = this;

var throttle = require('../js/utils').throttle;
var store = this.store = opts.store;
var event = store.dispatcher;
event.trigger(event.GALLERY_INIT);
store.on(store.CHANGED_EVENT, function () {
  return _this.update();
});
window.addEventListener('resize', throttle(function (ev) {
  return event.trigger(event.WINDOW_RESIZE, ev);
}, 100));
});
riot.tag2('container', '<div id="modal" onclick="{zoomOut}" class="{opts.is_modal ? \'show\' : \'\'}"></div> <div data-is="box" each="{opts.entries}" id="{id}" riot-style="width: {width}px; height: {height}px; top: {top}px; left: {left}px" path="{parent.opts.path}" dispatcher="{parent.opts.dispatcher}" class=" {toFront ? \'tofront\' : \'\'} {zoomIn ? \'zoomin\' : \'\'}"></div>', 'container,[riot-tag="container"],[data-is="container"]{ position: relative; } container #modal,[riot-tag="container"] #modal,[data-is="container"] #modal{ position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0); background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////AAAAVcLTfgAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==\'); z-index: 98; visibility: hidden; opacity: 0; transition: visibility 0s linear, opacity 5s ease; } container #modal.show,[riot-tag="container"] #modal.show,[data-is="container"] #modal.show{ visibility: visible; opacity: 1; background-color: rgba(255, 255, 255, 1); transition: background-color .5s ease; } container .tofront,[riot-tag="container"] .tofront,[data-is="container"] .tofront{ z-index: 200; } container a,[riot-tag="container"] a,[data-is="container"] a{ cursor: url(/assets/img/zoom-in.png) 9 9, auto; } container .zoomin .frame,[riot-tag="container"] .zoomin .frame,[data-is="container"] .zoomin .frame{ border: 5px solid rgba(255, 255, 255, 0.3); } container .zoomin a,[riot-tag="container"] .zoomin a,[data-is="container"] .zoomin a{ cursor: url(/assets/img/zoom-out.png) 9 9, auto; } container .show_modal,[riot-tag="container"] .show_modal,[data-is="container"] .show_modal{ animation: show_modal .8s ease; } @keyframes show_modal { from { opacity: 0; } to { opacity: 1; } }', '', function(opts) {
var event = opts.dispatcher;
this.zoomOut = function () {
  event.trigger(event.IMG_ZOOM_OUT);
};
});
riot.tag2('box', '<a href="#_{id}" onclick="{zoom}"> <img_comp runup="{img_comp.runup}" back="{opts.path}/{img_comp.back}" fore="{opts.path}/{img_comp.fore}" class="{zoom}"></img_comp></a>', 'box,[riot-tag="box"],[data-is="box"]{ position: absolute; transition-property: left, top, height, width; transition-duration: .2s; transition-timing-function: ease; }', '', function(opts) {
var _this = this;

var throttle = require('../js/utils').throttle;
var event = opts.dispatcher;

this.zoom = function (ev) {
  event.trigger(event.IMAGE_ZOOM, _this.id);
};

this.root.addEventListener('transitionend', throttle(function (ev) {
  event.trigger(event.TRANSITION_END, _this.id);
}, 10), false);
});
riot.tag2('img_comp', '<div class="image"><img id="runup" if="{!loaded}" riot-src="{opts.runup}" class="full fadein"> <div id="texture" if="{!loaded}" class="frame full"></div><img id="base" riot-src="{opts.back}" class="frame max fadein"><img riot-src="{opts.fore}" class="frame max"> </div>', 'img_comp .frame,[riot-tag="img_comp"] .frame,[data-is="img_comp"] .frame{ position: absolute; top: 0; left:50%; transform: translateX(-50%); } img_comp .max,[riot-tag="img_comp"] .max,[data-is="img_comp"] .max{ max-width: 100%; max-height: 100%; } img_comp .full,[riot-tag="img_comp"] .full,[data-is="img_comp"] .full{ width: 100%; height: 100%; } img_comp #texture,[riot-tag="img_comp"] #texture,[data-is="img_comp"] #texture{ background: rgba(255, 255, 255, 0.3) url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////AAAAVcLTfgAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==\') fixed; } img_comp .fadein,[riot-tag="img_comp"] .fadein,[data-is="img_comp"] .fadein{ animation: fadein .8s ease; } @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }', '', function(opts) {
var _this = this;

this.base.addEventListener("animationend", function () {
  _this.base.classList.remove('fadein');
  _this.loaded = true;
}, false);
});
riot.tag2('raw', '<div id="content" data="{this.set(this.opts.html)}" class="body"></div>', '', '', function(opts) {
var _this = this;

this.set = function (html) {
  _this.content.innerHTML = html;
  return 'true';
};
});