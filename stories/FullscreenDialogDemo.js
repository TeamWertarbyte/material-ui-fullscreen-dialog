import React from 'react'
import { action } from '@storybook/addon-actions'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import FullscreenDialog from '../src/FullscreenDialog'

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  render () {
    return (
      <div>
        <FullscreenDialog
          open={this.state.open}
          onRequestClose={(...args) => {
            action('onRequestClose')(...args)
            this.setState({ open: false })
          }}
          title='Some demo dialog'
          actionButton={<FlatButton
            label='Done'
            onClick={() => this.setState({ open: false })}
          />}
        >
          <TextField
            floatingLabelText='Very important field'
            fullWidth
          />
          <div style={{ height: 5000 }} />
          I knew you would scroll down. Just wanted to show that scrolling is supported. :D
        </FullscreenDialog>

        <RaisedButton
          onClick={() => this.setState({ open: true })}
          label='Open dialog'
        />
      </div>
    )
  }
}
