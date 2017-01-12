import React, { PropTypes, Component } from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'

const getStyles = (props) => ({
  root: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1500,
    background: '#fafafa'
  }
})

class TransitionItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
  };

  state = {
    style: {
      opacity: 0,
      transition: 'all 225ms cubic-bezier(0.0, 0.0, 0.2, 1)',
      transform: 'translate(0, 56px)'
    },
  };

  componentWillUnmount() {
    clearTimeout(this.enterTimeout);
    clearTimeout(this.leaveTimeout);
  }

  componentWillEnter(callback) {
    this.componentWillAppear(callback);
  }

  componentWillAppear(callback) {
    this.enterTimeout = setTimeout(() => {
      this.setState({
        style: {
          opacity: 1,
          transition: 'all 225ms cubic-bezier(0.0, 0.0, 0.2, 1)',
          transform: 'translate(0, 0px)',
        }
      })
      this.enterTimeout = setTimeout(callback, 225); // matches transition duration
    })
  }

  componentWillLeave(callback) {
    this.setState({
      style: {
        opacity: 0,
        transition: 'all 195ms cubic-bezier(0.4, 0.0, 1, 1)',
        transform: 'translate(0, 56px)'
      },
    });

    this.leaveTimeout = setTimeout(callback, 195); // matches transition duration
  }

  render() {
    const {
      style,
      children,
      ...other
    } = this.props;

    return (
      <div {...other} style={{ ...style, ...this.state.style }}>
        {children}
      </div>
    );
  }
}

export default class FullscreenDialogFrame extends Component {
  render () {
    const styles = getStyles(this.props)

    const {
      children,
      style,
      title,
      titleStyle,
    } = this.props

    return (
      <ReactTransitionGroup
        component='div'
        transitionAppear={true}
        transitionAppearTimeout={225}
        transitionEnter={true}
        transitionEnterTimeout={225}
      >
        {this.props.open && (
          <TransitionItem style={{
              ...styles.root,
              ...style
            }}
          >
            {this.props.children}
          </TransitionItem>
        )}
      </ReactTransitionGroup>
    )
  }
}

FullscreenDialogFrame.propTypes = {
  children: PropTypes.node,  
  open: PropTypes.bool.isRequired,
  style: PropTypes.object
}
