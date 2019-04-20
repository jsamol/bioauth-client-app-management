import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class BioAuthFooter extends Component {
  render() {

    return (
      <React.Fragment>
        <span className="ml-auto">Powered by <a href="https://coreui.io/react">CoreUI for React</a></span>
      </React.Fragment>
    );
  }
}

BioAuthFooter.propTypes = propTypes;
BioAuthFooter.defaultProps = defaultProps;

export default BioAuthFooter;
