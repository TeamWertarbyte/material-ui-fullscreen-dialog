import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Transition from "react-transition-group/Transition";

// disable the animation when using Safari's swipe-back gesture
// TODO make this configurable with a prop
const disableAnimationIfSwiping = true || !!process.env.IOS;
let disableNextAnimation = true;
document.addEventListener("click", () => {
  disableNextAnimation = false;
  setTimeout(() => {
    disableNextAnimation = true;
  }, 500);
});

const styles = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
};

const transitionStyles = {
  initial: {
    transition: "all 225ms cubic-bezier(0.0, 0.0, 0.2, 1)",
    transform: "translate(0, 56px)",
  },
  entering: {
    transform: "translate(0, 0px)",
    transition: "all 225ms cubic-bezier(0.0, 0.0, 0.2, 1)",
  },
  enteringFast: {
    transform: "translate(0, 0px)",
    transition: "none",
  },
  exiting: {
    transition: "all 195ms cubic-bezier(0.4, 0.0, 1, 1)",
    transform: "translate(0, 56px)",
  },
  exitingFast: {
    transition: "none",
  },
  exited: {
    transition: "all 225ms cubic-bezier(0.0, 0.0, 0.2, 1)",
    transform: "translate(0, 56px)",
  },
};

function setStyles(newStyles, node) {
  for (const style of Object.keys(newStyles)) {
    // eslint-disable-next-line no-param-reassign
    node.style[style] = newStyles[style];
  }
}

class Slide extends React.Component {
  handleEnter = (node) => {
    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleEntering = (node) => {
    setStyles(
      disableAnimationIfSwiping && disableNextAnimation
        ? transitionStyles.enteringFast
        : transitionStyles.entering,
      node
    );
    disableNextAnimation = true;
    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleExit = (node) => {
    setStyles(
      disableAnimationIfSwiping && disableNextAnimation
        ? transitionStyles.exitingFast
        : transitionStyles.exiting,
      node
    );
    disableNextAnimation = true;
    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  handleExited = (node) => {
    setStyles(transitionStyles.exited, node);
    if (this.props.onExited) {
      this.props.onExited(node);
    }
  };

  render() {
    const {
      children,
      in: inProp,
      onEnter,
      onEntering,
      onExit,
      onExited,
      style: styleProp,
      onClose,
      ...other
    } = this.props;

    const style = {
      ...styleProp,
      ...(React.isValidElement(children) ? children.props.style : {}),
    };

    const handleClose = () => {
      disableNextAnimation = false;
      onClose();
    };

    return (
      <Transition
        appear
        in={inProp}
        onEntering={this.handleEntering}
        onEnter={this.handleEnter}
        onExit={this.handleExit}
        onExited={this.handleExited}
        timeout={{ exit: 225, enter: 195, appear: 195 }}
        onClose={handleClose}
        {...other}
      >
        {(state, childProps) => {
          return React.cloneElement(children, {
            style: {
              opacity: 0,
              willChange: "opacity",
              ...transitionStyles.initial,
              ...styles[state],
              ...style,
              ...children.props.style,
            },
            ...childProps,
          });
        }}
      </Transition>
    );
  }
}

Slide.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  style: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default function FullscreenDialog({ children, ...other }) {
  return (
    <Dialog {...other} fullScreen TransitionComponent={Slide} hideBackdrop>
      {children}
    </Dialog>
  );
}

FullscreenDialog.propTypes = {
  children: PropTypes.node,
};
