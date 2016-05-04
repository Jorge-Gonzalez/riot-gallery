justified-gallery

  //- container tag
  div(
    data-is="container", 
    style="height: {store.height}px; width: {store.width}px;", 
    entries="{store.entries}",
    path="{store.path}",
    dispatcher="{store.dispatcher}"
  )

  #desciption(style="width: {store.width}px")
    h3.header {store.name}
    raw(html="{store.desc.es}")

  modal(
    is_modal="{store.showModal}", 
    dispatcher="{store.dispatcher}"
  )

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
      throttle((ev) => event.trigger(event.WINDOW_RESIZE, ev), 200));

container

  //- box tag
  div(
    data-is="box", 
    each="{opts.entries}",
    class=" {toFront ? 'tofront' : ''} {zoomIn ? 'zoomin' : ''}", 
    id="{id}", 
    style="width: {width}px; height: {height}px; top: {top}px; left: {left}px", 
    path="{parent.opts.path}",
    dispatcher="{parent.opts.dispatcher}"
  )

  style(scoped).
    :scope {
      position: relative;
    }
    .tofront {
      z-index: 200;
    }
    a {
      cursor: url(/assets/img/zoom-in.png) 9 9, auto;
    }
    .zoomin a {
      cursor: url(/assets/img/zoom-out.png) 9 9, auto;
    }

box

  a(href="#_{id}", onclick="{zoom}")
      
    img_comp(
      class="{zoom}", 
      runup="{img_comp.runup}", 
      back="{opts.path}/{img_comp.back}", 
      fore="{opts.path}/{img_comp.fore}"
    )

  style(scoped).

    :scope {
      position: absolute;
      transition-property: left, top, height, width;
      transition-duration: .2s;
      transition-timing-function: cubic-bezier(.29,.06,.03,1);
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

    img(id="runup", if="{!loaded}", class="full fadein", src="{opts.runup}")
    #texture(if="{!loaded}", class="pos full")
    img(id="base", class="pos max fadein", src="{opts.back}")
    img(if="{opts.fore}" src="{opts.fore}", class="pos max")

  style(scoped).

    .pos {
      position: absolute;
      top: 0;
      left:50%;
      transform: translateX(-50%);
    }
    .max {
      max-width: 100%;
      max-height: 100%;
    }
    .full {
      width: 100%;
      height: 100%;
    }
    #texture {
      background: rgba(255, 255, 255, 0.3) url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////AAAAVcLTfgAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==') fixed;
    }
    .fadein {
      animation: fadein .8s ease;
    }
    @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    .fix {
      border-color: rgba(255, 255, 255, 0);
    }

  script.

    this.base.addEventListener("animationend", () => {
      this.base.classList.remove('fadein');
      this.loaded = true;
    }, false);

modal
  
  .modal(
    class="{opts.is_modal ? 'show' : ''}", 
    onclick="{zoomOut}"
  )

  style.

    * { padding: 0; margin: 0; }
    html, body, main, section, .modal {
        min-height: 100% !important;
        height: 100%;
    }

    .modal {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100vw;
      min-height: 100vh;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 0);
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////AAAAVcLTfgAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==');
      z-index: 98;
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s linear, opacity 5s ease;
    }
    .show {
      visibility: visible;
      opacity: 1;
      background-color: rgba(255, 255, 255, 1);
      transition: background-color .5s ease;
    }

  script.

    let event = opts.dispatcher;
    this.zoomOut = () => {
      event.trigger(event.IMG_ZOOM_OUT);
    }

raw
  .body(id="content" data="{this.set(this.opts.html)}")

  script.

    this.set = (html) => {
      this.content.innerHTML = html;
      return 'true';
    }
