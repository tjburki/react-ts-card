import * as React from "react";
import { Component } from "react";

interface IProps {
  style?: any,
  className?: string
}

export class Section extends Component<IProps> {
    _style = {
        padding: 15,
        boxShadow: '0px 2px 32px -5px rgba(0,0,0,0.75)',
        marginBottom: 15,
        marginTop: 15,
        backgroundColor: '#FBF8F0'
    } 

    render() {
        const { children, style, className } = this.props;
        return (
        <div className={className} style={{...this._style, ...style}}>
            {children}
        </div>
        );
    }
}