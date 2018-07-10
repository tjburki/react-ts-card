import * as React from 'react';
import { Component } from 'react'; 
import { Section } from "../layout";
import './subheader.css';

interface IProps {
    style?: any,
    className?: any
}

class Subheader extends Component<IProps> {
    render() {
        const { className, style, children } = this.props;

        return (
            <Section className={`c-subheader ${className}`} style={{...style}}>
                {children}
            </Section>
        );
    }
}

export default Subheader;