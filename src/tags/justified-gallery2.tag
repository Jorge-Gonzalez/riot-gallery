justified-gallery

  section

    h3 {opts.store.name}
    raw(html="{opts.store.desc.es}")

    .justified(data-is="container" style="height: {opts.store.height}", store="{opts.store}")

  script.

    let event = opts.store.dispatcher;
    event.trigger(event.LOAD_GALLERY);

container

  box(each="{opts.store.entries}" store="{parent.opts.store}")

  style.
    container {
      position: relative;
      background: seagreen;
      /*cambiar esto a dinamico para adaptativo*/
      width: 1060px;
    }

box

  .box(id="{id}" onclick="{toggle}" style="{boxStyle}")

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

    this.path = opts.store.path;

    this.boxStyle =
     `background-image: url('${this.path}/${this.id}.jpg'), url('${this.img}'); 
      width: ${this.width}px; 
      height: ${this.height}px; 
      top: ${this.top}px; 
      left: ${this.left}px`;
    
    let event = opts.store.dispatcher;
    this.toggle = () => event.trigger(event.IMG_TOGGLE, this.id);

raw

  script.
    
    let setRawContent = () => this.root.innerHTML = opts.html;
    this.on('update', () => setRawContent());
    setRawContent();
