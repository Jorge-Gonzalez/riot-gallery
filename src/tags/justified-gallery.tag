justified-gallery

  //- container tag
  div(
    data-is="container", 
    style="height: {store.height}px; width: {store.width}px;", 
    entries="{store.entries}",
    path="{store.path}",
    dispatcher="{store.dispatcher}",
    is_modal="{store.showModal}"
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
      throttle((ev) => event.trigger(event.WINDOW_RESIZE, ev), 200));

container

  #modal(class="{opts.is_modal ? 'show' : ''}", onclick="{zoomOut}")

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
    #modal {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0);
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////AAAAVcLTfgAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==');
      z-index: 98;
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s linear, opacity 5s ease;
    }
    #modal.show {
      visibility: visible;
      opacity: 1;
      background-color: rgba(255, 255, 255, 1);
      transition: background-color .5s ease;
    }
    .tofront {
      z-index: 200;
    }
    a {
      cursor: url(/assets/img/zoom-in.png) 9 9, auto;
    }
    .zoomin .frame {
      border: 5px solid rgba(255, 255, 255, 0.3);
    }
    .zoomin a {
      cursor: url(/assets/img/zoom-out.png) 9 9, auto;
    }
    .show_modal {
      animation: show_modal .8s ease;
    }
    @keyframes show_modal {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

  script.

    let event = opts.dispatcher;
    this.zoomOut = () => {
      event.trigger(event.IMG_ZOOM_OUT);
    }

box

  a(href="#_{id}", onclick="{zoom}")
      
    img_comp(
      if="{img_comp}", 
      class="{zoom}", 
      runup="{img_comp.runup}", 
      back="{opts.path}/{img_comp.back}", 
      fore="{opts.path}/{img_comp.fore}"
    )

    div(
      if="{div}"
    )

  style(scoped).

    :scope {
      position: absolute;
      transition-property: left, top, height, width;
      transition-duration: .2s;
      transition-timing-function: ease;
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
    #texture(if="{!loaded}", class="frame full")
    img(id="base", class="frame max fadein", src="{opts.back}")
    img(src="{opts.fore}", class="frame max")

  style(scoped).

    .frame {
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

  script.

    this.base.addEventListener("animationend", () => {
      this.base.classList.remove('fadein');
      this.loaded = true;
    }, false);

raw
  .body(id="content" data="{this.set(this.opts.html)}")

  script.

    this.set = (html) => {
      this.content.innerHTML = html;
      return 'true';
    }
