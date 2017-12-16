import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FlatButton from 'material-ui/FlatButton'
import FullscreenDialogDemo from './FullscreenDialogDemo'
import FullscreenDialog from '../src/FullscreenDialog'

function themed (children) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div style={{ fontFamily: 'Roboto, sans-serif' }}>
        {children}
      </div>
    </MuiThemeProvider>
  )
}

storiesOf('FullscreenDialog', module)
  .add('interactive demo', () => themed(
    <FullscreenDialogDemo />
  ))
  .add('opened', () => themed(
    <FullscreenDialog
      open
      title='Demo dialog'
      onRequestClose={action('onRequestClose')}
      actionButton={<FlatButton
        label='Done'
      />}
    >
      Hello world.
    </FullscreenDialog>
  ))
  .add('without close button', () => themed(
    <FullscreenDialog
      open
      title='No close button'
      actionButton={<FlatButton
        label='Done'
      />}
    >
      This popup's <code>onRequestClose</code> prop is not specified,
      so no close/back icon is displayed.
    </FullscreenDialog>
  ))
  .add('immersive mode', () => themed(
    <FullscreenDialog
      open
      immersive
      title='Im-meow-sive mode'
      onRequestClose={action('onRequestClose')}
    >
      <img src='https://lorempixel.com/1920/1080/cats/' style={{ width: '100%' }} />
    </FullscreenDialog>
  ))
  .add('with custom z-depth', () => themed(
    <FullscreenDialog
      open
      title='Demo dialog'
      onRequestClose={action('onRequestClose')}
      appBarZDepth={2}
    >
      More shadow.
    </FullscreenDialog>
  ))
