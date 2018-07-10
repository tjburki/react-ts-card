import * as React from "react";
import { Component } from "react";
import './fullPage.css';

class FullPage extends Component {
  render() {
    return (
      <div className="c-full-page">
        {this.props.children}
      </div>
    );
  }
}

export default FullPage;
