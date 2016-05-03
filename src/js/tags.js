import riot from 'riot';
import justifiedLayout from 'justified-layout';

// meter los datos desde json y a travez del store
// agregar el tag de imagen.

riot.tag('justified-gallery',

  `<section>
    <h2>Input: <code>[{demo.className}]</code></h2>
    <container style="height: {height}" boxes={this.boxes}></container>
  </section>`,

  function(opts) {

    this.demo = {
      sizes: [1.33, 1.33, 1.21, 1.21, 1.21],
      className: "snapshot",
      config: {
        containerWidth: 1060
      }
    };

    var geometry = justifiedLayout(this.demo.sizes, this.demo.config);
    this.boxes = geometry.boxes;
    this.height = geometry.containerHeight;

    

    //let dispatcher = this.opts.store.dispatcher;
    // this.on('mount', () => dispatcher.trigger(dispatcher.INIT_TODOS));
  }
);

riot.tag('container',

  `<box each={opts.boxes} bb={this}></box>`,

  'class="justified"',

  function(opts) {
    
  }
);

riot.tag('box',

  `<div class="box" 
    style="
      width:  {opts.bb.width}px; 
      height: {opts.bb.height}px; 
      top:    {opts.bb.top}px; 
      left:   {opts.bb.left}px">
  </div>`,

  function(opts) {
    //
  }
);


