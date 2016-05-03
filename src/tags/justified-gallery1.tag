justified-gallery

  section

    h3 {opts.store.gallery.name}
    raw(html="{opts.store.gallery.desc.es}")

    container(style="height: {opts.store.gallery.height}", store="{opts.store}")

  script.

    let event = opts.store.dispatcher;
    event.trigger(event.LOAD_GALLERY);

container

  box(each="{opts.store.gallery.entries}" store="{parent.opts.store}")

  style.
    container {
      position: relative;
      background: seagreen;
      width: 1060px;
    }

div(data-is="box")

  .box(
    id="{id}",
    onclick="{toggle}", 
    style="background-image: url('{path}/{id}.jpg'), url('{img}'); width: {width}px; height: {height}px; top: {top}px; left: {left}px")

    img(src="{path}/{id}.png" alt="{id}")

  style.

    box .box {
      background-size: 100%;
      background-repeat: no-repeat;
      position: absolute;
    }
    box .box img {
      width: 100%;
    }

  script.
    
    this.path = opts.store.gallery.path;
    let event = opts.store.dispatcher;
    this.toggle = () => event.trigger(event.IMG_TOGGLE, this.id);

raw

  script.
    console.log(this.root)
    let setRawContent = () => this.root.innerHTML = opts.html;
    this.on('update', () => setRawContent());
    setRawContent();
