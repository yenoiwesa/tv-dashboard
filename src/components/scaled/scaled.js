import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import jQuery from 'jquery';

// This function takes a component...
function scaled(WrappedComponent) {
  // ...and returns another component...
  return class extends Component {

    constructor(props) {
      super(props);
      this.updateScale = this.updateScale.bind(this);
      this.wrapped = React.createRef();
    }

    updateScale() {
      const container = jQuery(ReactDOM.findDOMNode(this.wrapped.current));
      const content = container.children().first();
  
      const scale = Math.min(
        container.width() / content.outerWidth(),    
        container.height() / content.outerHeight()
      );
  
      content.css({
        transform: `scale(${scale})`
      });
    }

    componentDidMount() {
      // call initially
      this.updateScale();
      window.addEventListener('resize', this.updateScale);
    }
  
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateScale);
    }

    render() {
      return <WrappedComponent ref={this.wrapped} {...this.props} />;
    }

  };
}

export default scaled;