import React, { PropTypes, Component } from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationCloseIcon from 'material-ui/svg-icons/navigation/close'

import FullscreenDialogFrame from './FullscreenDialogFrame'

const getStyles = (props, theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: 20,
    fontWeight: 500
  },
  appBar: {
    height: (props.appBarStyle ? props.appBarStyle.height : null) || theme.appBar.height
  },
  container: {
    flex: 1,
    overflow: 'auto',
    padding: 16
  }
})

export default class FullscreenDialog extends Component {
  componentDidMount () {
    this.id = `popup-${Date.now()}`
    if (this.props.open) {
      history.replaceState(this.id, 'popup')
      history.pushState(this.id, 'popup')
    }
    window.addEventListener('popstate', this.onPopState)
  }

  componentWillUnmount () {
    window.removeEventListener('popstate', this.onPopState)
  }

  onPopState = ({ state }) => {
    history.pushState(this.id, 'popup')   
    if (state === this.id && this.props.onRequestClose) {
      this.props.onRequestClose()
    }
  }

  componentWillReceiveProps ({ open }) {
    if (open && !this.props.open) {
      history.replaceState(this.id, 'popup')
      history.pushState(this.id, 'popup')
    }
  }

  render () {
    const styles = getStyles(this.props, this.context.muiTheme)

    const {
      actionButton,
      appBarStyle,
      children,
      closeIcon,
      containerStyle,
      open,
      style,
      title,
      titleStyle,
    } = this.props

    return (
      <FullscreenDialogFrame
        open={open}
        style={{ ...style, ...styles.root }}
      >
        <AppBar
          title={title}
          titleStyle={{ ...styles.title, ...titleStyle }}
          style={{ ...styles.appBar, ...appBarStyle }}
          iconElementLeft={(
            <IconButton onTouchTap={() => this.props.onRequestClose()}>
                {closeIcon || <NavigationCloseIcon />}
            </IconButton>
          )}
          iconElementRight={actionButton}
        />
        <div style={{ ...styles.container, ...containerStyle }}>
          {this.props.children}
        </div>
      </FullscreenDialogFrame>
    )
  }
}

FullscreenDialog.propTypes = {
  actionButton: PropTypes.node,
  appBarStyle: PropTypes.object,
  children: PropTypes.node,
  closeIcon: PropTypes.node,
  containerStyle: PropTypes.object,
  onRequestClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  style: PropTypes.object,
  title: PropTypes.string
}

FullscreenDialog.contextTypes = {
  muiTheme: PropTypes.object
}
