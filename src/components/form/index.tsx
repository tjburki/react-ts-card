import * as React from 'react';
import {Component} from 'react';

interface IProps {
    style?: React.CSSProperties,
    className?: string
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => any,
    disabled?: boolean
}

class Form extends Component<IProps> {
    _onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const { onSubmit } = this.props;
        e.preventDefault();
        onSubmit(e);
    }

    render() {
        const { className, style, children, disabled } = this.props;
        return (
            <form onSubmit={e => this._onSubmit(e)} className={className} style={{...style}}>
                <fieldset disabled={disabled || false}>
                    {children}
                </fieldset> 
            </form>
        );
    }
}

export default Form;