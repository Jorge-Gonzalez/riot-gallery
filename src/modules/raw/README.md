#Raw tag
##Render unescaped HTML

Riot expressions can only render text values without HTML formatting. However this custom tag can do the job. For example:

```HTML
<my-tag>
  <p>Here is some raw content: <raw content="{ html }"/> </p>

  this.html = 'Hello, <strong>world!</strong>'
</my-tag>
```

demo

**warning** this could expose the user to XSS attacks so make sure you never load data from an untrusted source.

Credit: copied from: [Riot js website](http://riotjs.com/guide/)