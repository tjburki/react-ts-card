import * as React from 'react';
import {Component} from 'react';
import { kwikConnect, IAppProps, saveBasket, deleteBasket } from '../../../store/store';
import { handleChange, fillBasket } from '../../../shared/helpers';
import { IBasket } from '../../../shared/interfaces';
import DatePicker from 'react-datepicker';
//import { Select } from 'react-select';
//import { handleChange } from '../../../shared/helpers';

import EditSection from '../../../components/editSection';
import Form from '../../../components/form';

import 'react-datepicker/dist/react-datepicker.css';
import * as moment from 'moment';
import { EProduceType } from '../../../shared/types';

interface IState {
    editBasket: IBasket,
    disabled: boolean
}

@kwikConnect
class EditBasket extends Component<any, IState> {
    newBasket: IBasket = {
        id: '',
        produceIds: null,
        start: moment(),
        end: moment()
    }

    state = {
        editBasket: this.newBasket,
        disabled: false
    }

    _changeEditBasket = (id: string) =>{ 
        const { baskets } = this.props;
        let nb = baskets.find((b: IBasket) => b.id === id) || this.newBasket; 
        this.setState({editBasket: {...nb}});
    }

    _setStart = (val: moment.Moment) => this.setState({editBasket: {...this.state.editBasket, start: val, end: moment.max(val, this.state.editBasket.end)}});
    _setEnd = (val: moment.Moment) => this.setState({editBasket: {...this.state.editBasket, end: val, start: moment.min(this.state.editBasket.start, val)}});
    _setProduce = (val: HTMLOptionsCollection) => {
        let vals: string[] = [];
        for (let i = 0; i < val.length; i++) {
            if (val[i].selected) {
                vals.push(val[i].value);
            }
        }
        this.setState({editBasket: {...this.state.editBasket, produceIds: vals}})
    };
    _saveBasket = () => {
        this.setState({disabled: true});
        saveBasket({...this.state.editBasket}).then((db: any) => this.setState({editBasket: {...this.state.editBasket, id: db ? db.key : this.state.editBasket.id}, disabled: false}));
    };
    _deleteBasket = () => {
        this.setState({disabled: true});
        deleteBasket(this.state.editBasket.id).then(() => this.setState({editBasket: this.newBasket, disabled: false}));
    };


    render() {
        const { baskets, produce, allProduce } = this.props as IAppProps;
        const { editBasket, disabled } = this.state;
        const vegetables = produce.filter(p => p.type === EProduceType.vegetable);
        const fruit = produce.filter(p => p.type === EProduceType.fruit);
        
        return (
            <EditSection 
                title='Baskets'
                onSelect={handleChange(this._changeEditBasket)}
                selectOptions={
                    baskets.map(b => ({
                        value: b.id, 
                        display: fillBasket(b, allProduce).display()
                    }))
                }
                selectValue={editBasket.id}
            >
                <Form onSubmit={this._saveBasket} disabled={disabled} style={{backgroundColor: '#FFF', borderTop: '3px solid rgb(74, 46, 28)'}}>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Produce</label>
                            <div>
                                <select multiple className="form-control" value={editBasket.produceIds || []} onChange={e => this._setProduce(e.target.options)}>
                                    {vegetables ? <optgroup label="Vegetables">{vegetables.map(v => <option value={v.id}>{v.title}</option>)}</optgroup> : null}
                                    {fruit ? <optgroup label="Fruit">{fruit.map(f => <option value={f.id}>{f.title}</option>)}</optgroup> : null}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <label>Start</label>
                            <div>
                                <DatePicker selectsStart className='form-control' startDate={editBasket.start} endDate={editBasket.end} selected={editBasket.start} onChange={this._setStart} />
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <label>End</label>
                            <div>
                                <DatePicker selectsEnd className='form-control' startDate={editBasket.start} endDate={editBasket.end} selected={editBasket.end} onChange={this._setEnd} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 text-center" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse'}}>
                            <button type="submit" ref="submit" className="btn btn-success"><i className="fa fa-save"></i> Save Basket</button>
                            { editBasket.id ? <button type="button" onClick={this._deleteBasket} className="btn btn-danger"><i className="fa fa-trash-o"></i> Delete Basket</button> : null }
                        </div>
                    </div> 
                </Form>
            </EditSection>
        );
    }
}

export default EditBasket;