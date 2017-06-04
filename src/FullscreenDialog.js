import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationCloseIcon from 'material-ui/svg-icons/navigation/close'

import FullscreenDialogFrame from './FullscreenDialogFrame'

const getStyles = (props, theme) => {
  const styles = {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    appBar: {
      height: (props.appBarStyle ? props.appBarStyle.height : null) || theme.appBar.height
    },
    container: {
      flex: 1,
      overflow: 'auto'
    }
  }

  if (props.immersive) {
    styles.appBar.background = 'linear-gradient(0deg, rgba(0,0,0,0), rgba(0,0,0,0.4)'
    styles.appBar.position = 'absolute'
  }

  return styles
}

export default function FullscreenDialog (props, { muiTheme }) {
  const styles = getStyles(props, muiTheme)

  const {
    actionButton,
    appBarStyle,
    children,
    closeIcon,
    containerStyle,
    immersive,
    onRequestClose,
    open,
    style,
    title,
    titleStyle
  } = props

  return (
    <FullscreenDialogFrame
      open={open}
      style={{ ...style, ...styles.root }}
    >
      <AppBar
        title={title}
        titleStyle={titleStyle}
        style={{ ...styles.appBar, ...appBarStyle }}
        iconElementLeft={(
          <IconButton onTouchTap={onRequestClose}>
            {closeIcon || <NavigationCloseIcon />}
          </IconButton>
        )}
        iconElementRight={actionButton}
        showMenuIconButton={onRequestClose != null}
        zDepth={immersive ? 0 : undefined}
      />
      <div style={{ ...styles.container, ...containerStyle }}>
        {children}
      </div>
    </FullscreenDialogFrame>
  )
}

FullscreenDialog.propTypes = {
  actionButton: PropTypes.node,
  appBarStyle: PropTypes.object,
  children: PropTypes.node,
  closeIcon: PropTypes.node,
  containerStyle: PropTypes.object,
  immersive: PropTypes.bool,
  onRequestClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  style: PropTypes.object,
  title: PropTypes.string,
  titleStyle: PropTypes.object
}

FullscreenDialog.defaultProps = {
  immersive: false
}

FullscreenDialog.contextTypes = {
  muiTheme: PropTypes.object
}
