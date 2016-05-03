<comment-box>
  <h1>{ opts.title }</h1>

  <comment-list comments={ comments } />
  <comment-form />

  this.comments = [];

  add(comment) {
    this.comments.push(comment)
    this.update()
  }
</comment-box>

<comment-form>
  <form onsubmit={ add }>
    <input type="text" name="name">
    <textarea name="message"></textarea>
    <input type="submit" value="Post">
  </form>

  add(e) {
    var comment = {
      name: this.name.value,
      message: this.message.value
    }

    this.parent.add(comment)
    e.target.reset()
  }
</comment-form>

<comment-list>
  <comment each={ opts.comments } name={ this.name } message={ this.message } />
</comment-list>

<comment>
  <div>
    <h2>{ opts.name }</h2>
    <p>{ opts.message }</p>
  </div>
</comment>