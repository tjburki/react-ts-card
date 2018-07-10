import * as React from 'react';
import {Component} from 'react';

interface IProps {
    checked?: boolean,
    text?: string,
    disabled?: boolean,
    onChange: (checked: boolean) => any
}

class Checkbox extends Component<IProps> {
    _onChange() {
        const {checked, onChange, disabled} = this.props;
        if (!disabled) onChange(!checked);
    }

    _style = {
        height: '34px',
        width: '100%',
        borderRadius: 5,
        border: '3px solid #4a2e1c',  
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    }

    render() {
        const {checked, text, disabled} = this.props;

        const style = {
            ...this._style,
            color: (checked ? 'white' : '#4a2e1c'),
            backgroundColor: (checked ? '#4a2e1c' : 'white'),
            opacity: (disabled ? .6 : 1),
            cursor: (disabled ? 'default' : 'pointer')
        };
        
        return (
            <button type="button" style={style} onClick={() => this._onChange()}>
                <i className={`fa fa-${(!!checked ? 'check-' : '')}square-o`}></i> {text}
            </button>
        );
    }
}

export default Checkbox;