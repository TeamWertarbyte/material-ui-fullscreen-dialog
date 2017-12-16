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
    appBarZDepth,
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
          <IconButton onClick={onRequestClose}>
            {closeIcon}
          </IconButton>
        )}
        iconElementRight={actionButton}
        showMenuIconButton={onRequestClose != null}
        zDepth={immersive ? 0 : appBarZDepth}
      />
      <div style={{ ...styles.container, ...containerStyle }}>
        {children}
      </div>
    </FullscreenDialogFrame>
  )
}

FullscreenDialog.propTypes = {
  /**
   * A `FlatButton` or `IconButton` that is used as affirmative action button.
   */
  actionButton: PropTypes.node,
  /**
   * Overrides the inline-styles of the app bar.
   */
  appBarStyle: PropTypes.object,
  /**
   * Overrides the z-depth of the app bar, will affect its shadow. This is ignored if immersive is set to `true`.
   */
  appBarZDepth: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  /**
   * Children elements.
   */
  children: PropTypes.node,
  /**
   * Icon element used for the dismissive action. This is hidden if `onRequestClose` is not set.
   */
  closeIcon: PropTypes.node,
  /**
   * Overrides the inline-styles of the dialog's children container.
   */
  containerStyle: PropTypes.object,
  /**
   *  Toggles the immersive mode. If set to `true`, the app bar has a semi-transparent gradient and overlays the content.
   */
  immersive: PropTypes.bool,
  /**
   * Callback that is invoked when the dismissive action button is touched.
   */
  onRequestClose: PropTypes.func,
  /**
   * Controls whether the dialog is opened or not.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Overrides the inline-styles of the dialog's root element.
   */
  style: PropTypes.object,
  /**
   * The title of the dialog.
   */
  title: PropTypes.string,
  /**
   * Overrides the inline-styles of the app bar's title element.
   */
  titleStyle: PropTypes.object
}

FullscreenDialog.defaultProps = {
  appBarZDepth: 1,
  closeIcon: <NavigationCloseIcon />,
  immersive: false
}

FullscreenDialog.contextTypes = {
  muiTheme: PropTypes.object
}
