This is a fullscreen dialog with a button on the right.

```
const RaisedButton = require('material-ui/RaisedButton').default;
const FlatButton = require('material-ui/FlatButton').default;

<div>
  <FullscreenDialog
    open={state.open}
    onRequestClose={(...args) => {
      setState({ open: false })
    }}
    title='Demo dialog'
    actionButton={<FlatButton
      label='Done'
      onClick={() => setState({ open: false })}
    />}
  />

  <RaisedButton
    onClick={() => setState({ open: true })}
    label='Open dialog'
  />
</div>
```

The fullscreen dialog also supports an _immersive mode_ that makes the app bar transparent.

```
const RaisedButton = require('material-ui/RaisedButton').default;

<div>
  <FullscreenDialog
    open={state.open}
    onRequestClose={(...args) => {
      setState({ open: false })
    }}
    title='Picture of a cat'
    immersive
  >
    <div style={{ width: '100%', height: '100%', background: 'url(https://lorempixel.com/1920/1080/cats/)', backgroundSize: 'cover' }} />
  </FullscreenDialog>

  <RaisedButton
    onClick={() => setState({ open: true })}
    label='Show cat'
  />
</div>
```