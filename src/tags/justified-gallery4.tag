justified-gallery

  //- container tag
  .justified(
    data-is="container", 
    style="height: {store.height}px; width: {store.width}px;", 
    isModal="{store.showModal}",
    entries="{store.entries}",
    path="{store.path}",
    dispatcher="{store.dispatcher}"
  )

  #desciption(style="width: {store.width}px")
    h3.header {store.name}
    raw(html="{store.desc.es}")

  style(scoped).
    :scope {
      margin: 0 auto;
      display: table;
      /* background: grey; */
    }

  script.
    let throttle = require('../js/utils').throttle;
    let store = this.store = opts.store;
    let event = store.dispatcher;
    event.trigger(event.GALLERY_INIT);
    store.on(store.CHANGED_EVENT, () => this.update());
    window.addEventListener('resize', 
      throttle((ev) => event.trigger(event.WINDOW_RESIZE, ev), 100));

container

  #modal(class="{opts.isModal ? 'show' : ''}", onclick="{zoomOut}")

  //- box tag
  div(
    data-is="box", 
    class=" {toFront ? 'tofront' : ''} {zoomIn ? 'zoomin' : ''}", 
    each="{opts.entries}", 
    id="{id}", 
    style="width: {width}px; height: {height}px; top: {top}px; left: {left}px", 
    path="{parent.opts.path}",
    dispatcher="{parent.opts.dispatcher}"
  )

  style.
    .justified {
      position: relative;
    }
    #modal {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.75) url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////AAAAVcLTfgAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==') fixed;
      z-index: 98;
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s linear 0.2s, opacity 0.2s ease;
    }
    #modal.show {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.2s ease;
    }

  script.

    let event = opts.dispatcher;
    this.zoomOut = () => {
      event.trigger(event.IMG_ZOOM_OUT);
    }

box

  a(href="#_{id}", onclick="{zoom}")
      
    img_comp(
      class="{zoom}"
      runup="{img_comp.runup}", 
      back="{opts.path}/{img_comp.back}", 
      fore="{opts.path}/{img_comp.fore}"
    )

  style(scoped).

    :scope {
      position: absolute;
      transition-property: left, top, height, width;
      transition-duration: .2s;
      transition-timing-function: ease;
    }
    .tofront {
      z-index: 200;
    }
    a {
      cursor: url(/assets/img/zoom-in.png) 9 9, auto;
    }
    .zoomin .comp {
      border: 5px solid rgba(255, 255, 255, 0.3);
    }
    a .zoomin {
      cursor: url(/assets/img/zoom-out.png) 9 9, auto;
    }

  script.

    let throttle = require('../js/utils').throttle;
    let event = opts.dispatcher;

    this.zoom = (ev) => {
      event.trigger(event.IMAGE_ZOOM, this.id);
    }

    this.root.addEventListener('transitionend', throttle((ev) => { 
      event.trigger(event.TRANSITION_END, this.id);
    }, 10), false);

img_comp

  .image

    img(src="{opts.runup}", class="runup")
    img(src="{opts.back}", class="comp")
    img(src="{opts.fore}", class="comp")

  style(scoped).

    :scope {
    }
    .comp {
      position: absolute;
      left:50%;
      max-width: 100%;
      max-height: 100%;
      transform: translateX(-50%);
    }
    .runup {
      width: 100%;
      height: 100%;
    }

raw
  .body(id="content" data="{this.set(this.opts.html)}")

  script.

    this.set = (html) => {
      this.content.innerHTML = html;
      return 'true';
    }

