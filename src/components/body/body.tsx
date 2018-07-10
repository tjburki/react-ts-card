import * as React from "react";
import { Component } from "react";
import './body.css';

class Body extends Component {
  render() {
    return (
      <div className='c-body'>
        {this.props.children}
      </div>
    );
  }
}

export default Body;