import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling'

const styles = {
  root: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1500,
    background: '#fafafa'
  },
  transition: {
    entering: {
      opacity: 0,
      transition: 'all 225ms cubic-bezier(0.0, 0.0, 0.2, 1)',
      transform: 'translate(0, 56px)'
    },
    entered: {
      opacity: 1,
      transition: 'all 225ms cubic-bezier(0.0, 0.0, 0.2, 1)',
      transform: 'translate(0, 0px)'
    },
    exiting: {
      opacity: 0,
      transition: 'all 195ms cubic-bezier(0.4, 0.0, 1, 1)',
      transform: 'translate(0, 56px)'
    },
    exited: {
      opacity: 0,
      transition: 'all 225ms cubic-bezier(0.0, 0.0, 0.2, 1)',
      transform: 'translate(0, 56px)'
    }
  }
}

export default function FullscreenDialogFrame ({ children, open, style }) {
  return (
    <Transition
      in={open}
      timeout={{exit: 225, enter: 225}}
      component='div'
      appear
      enter
    >
      {(state) => (
        <div style={{
          ...styles.root,
          ...styles.transition[state],
          ...style
        }}>
          {children}
          <AutoLockScrolling lock={open} />
        </div>
      )}
    </Transition>
  )
}

FullscreenDialogFrame.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool.isRequired,
  style: PropTypes.object
}
