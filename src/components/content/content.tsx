import * as React from 'react';
import { Component } from 'react'; 
import './content.css';

interface IProps {
    style?: any,
    className?: any
}

class Content extends Component<IProps> {
    render() {
        const { className, style, children } = this.props;

        return (
            <div className={`c-content clearfix ${className}`} style={{paddingLeft: 15, paddingRight: 15, ...style}}>
                {children}
            </div>
        );
    }
}

export default Content;