import riot from 'riot';

riot.tag('comment-box',

 `<h1>{opts.title}</h1>

  <comment-list comments={comments}></comment-list>
  <comment-form></comment-form>`,

  function (opts) {
	  this.comments = [];

	  this.add = (comment) => {
	    this.comments.push(comment)
	    this.update()
	  }
  }
);
  
riot.tag('comment-form',

 `<form onsubmit={add}>
    <input type="text" name="name">
    <textarea name="message"></textarea>
    <input type="submit" value="Post">
  </form>`,

	function (opts) {
	  this.add = (e) => {
	    var comment = {
	      name: this.name.value,
	      message: this.message.value
	    }

	    this.parent.add(comment)
	    e.target.reset()
	  }
	}
);

riot.tag('comment-list',

 `<comment each={opts.comments} name={this.name} message={this.message}></comment>`

);

riot.tag('comment',

 `<div>
    <h2>{opts.name}</h2>
    <p>{opts.message}</p>
  </div>`
  
);