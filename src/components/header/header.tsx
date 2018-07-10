import * as React from 'react';
import { Component } from 'react'; 
import './header.css';

interface IProps {
    style?: any,
    className?: any
}

class Header extends Component<IProps> {
    render() {
        const { className, style, children } = this.props;

        return (
            <div className={`c-header ${className}`} style={{...style}}>
                {children}
            </div>
        );
    }
}

export default Header;