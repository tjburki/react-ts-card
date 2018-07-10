import * as React from 'react';
import {Component} from 'react';

interface IProps {
    title: string,
    selectValue: any,
    selectOptions: {value: any, display: string, active?: boolean}[],
    onSelect: (e: any) => any
}

class EditSection extends Component<IProps> {
    render() {
        const { title, selectValue, selectOptions, onSelect } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <h1 style={{marginTop: 5}}>{title}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <select className="form-control" value={selectValue} onChange={onSelect}>
                            <option value="">New</option>
                            {
                                selectOptions.map(o => <option style={{color: o.active === false ? 'goldenrod' : 'inherit'}} key={o.value} value={o.value}>{o.display}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default EditSection;