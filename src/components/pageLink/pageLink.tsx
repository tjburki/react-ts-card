import * as React from "react";
import { Component } from "react";
import { EPage } from '../../shared/types';

interface IProps {
    page: EPage
}

class PageLink extends Component<IProps> {
    render() {
        return (
            <a href={`#${EPage[this.props.page]}`} style={{textDecoration: 'none', color: 'inherit'}}>
                {this.props.children}
            </a>
        );
    }
}

export default PageLink;