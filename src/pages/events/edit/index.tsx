import * as React from 'react';
import {Component} from 'react';
import Form from '../../../components/form';
import EditSection from '../../../components/editSection';
import { handleChange } from '../../../shared/helpers';
import { IAppProps, addImage, kwikConnect, saveEvent, deleteEvent } from '../../../store/store';
import { IEvent } from '../../../shared/interfaces';
import * as moment from 'moment';
import DatePicker from 'react-datepicker';

interface IState {
    editEvent: IEvent,
    disabled: boolean
}

@kwikConnect
class EditEvents extends Component<any, IState> {
    newEvent: IEvent = {
        id: '',
        name: '',
        start: moment(),
        end: moment(),
        description: '',
        image: ''
    }

    state = {
        editEvent: this.newEvent,
        disabled: false
    }

    _changeEditEvent = (id: string) => {
        const {events} = this.props;
        this.setState({editEvent: { ...(events.find((e: IEvent) => e.id === id) || this.newEvent) }});
    }
    _saveEvent = () => {
        this.setState({disabled: true});
        saveEvent({...this.state.editEvent}).then((db: any) => this.setState({editEvent: {...this.state.editEvent, id: db ? db.key : this.state.editEvent.id}, disabled: false}));
    }
    _deleteEvent = () => {
        this.setState({disabled: true})
        deleteEvent(this.state.editEvent.id).then(() => this.setState({editEvent: this.newEvent, disabled: false}));
    }
    _setName = (name: string) => this.setState({editEvent: {...this.state.editEvent, name: name}});
    _setDescription = (desc: string) => this.setState({editEvent: {...this.state.editEvent, description: desc}});
    _setStart = (val: moment.Moment) => this.setState({editEvent: {...this.state.editEvent, start: val, end: moment.max(val, this.state.editEvent.end)}});
    _setEnd = (val: moment.Moment) => this.setState({editEvent: {...this.state.editEvent, end: val, start: moment.min(this.state.editEvent.start, val)}});
    _addImage = (e: any) => {
        const image = e.target.files && e.target.files.length ? e.target.files[0] : null;
        const { editEvent } = this.state;
        if (!image) return;

        this.setState({disabled: true});
        addImage(`event/${editEvent.name}`, image).then((snapshot: any) => this.setState({editEvent: {...editEvent, image: snapshot.downloadURL}, disabled: false}));
    }

    render() {
        const { events } = this.props as IAppProps;
        const { editEvent, disabled } = this.state;

        return (
            <EditSection 
                title='Events'
                onSelect={handleChange(this._changeEditEvent)}
                selectOptions={
                    (events || []).map(e => ({
                        value: e.id, 
                        display: e.name
                    }))
                }
                selectValue={editEvent.id}
            >
                <Form onSubmit={this._saveEvent} disabled={disabled} style={{backgroundColor: '#FFF', borderTop: '3px solid rgb(74, 46, 28)'}}>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Name</label>
                            <div>
                                <input type="text" className="form-control" value={editEvent.name} onChange={handleChange(this._setName)} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Description</label>
                            <div>
                                <textarea className="form-control" onChange={handleChange(this._setDescription)} value={editEvent.description}></textarea>
                            </div>
                        </div>        
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <label>Start</label>
                            <div>
                                <DatePicker selectsStart className='form-control' startDate={editEvent.start} endDate={editEvent.end} selected={editEvent.start} onChange={this._setStart} />
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <label>End</label>
                            <div>
                                <DatePicker selectsEnd className='form-control' startDate={editEvent.start} endDate={editEvent.end} selected={editEvent.end} onChange={this._setEnd} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Image</label>
                            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <div>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        style={{height: 100, width: 100, fontSize: 75, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 10}}
                                        onClick={() => editEvent.name ? (this.refs.image as any).click() : (this.refs.submit as any).click()}
                                    >
                                        <i className="fa fa-camera"></i>
                                    </button>
                                </div>
                                <div>
                                    {editEvent.image ? <img src={editEvent.image} style={{maxHeight: 100}} /> : <i style={{fontSize: 50, fontStyle: 'italic', color: '#BBB'}}>No image selected</i>}
                                </div>
                                <input type="file" ref="image" className="form-control hidden" accept="image/*;capture=camera" onChange={this._addImage} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 text-center" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse'}}>
                            <button type="submit" ref="submit" className="btn btn-success"><i className="fa fa-save"></i> Save Event</button>
                            { editEvent.id ? <button type="button" onClick={this._deleteEvent} className="btn btn-danger"><i className="fa fa-trash-o"></i> Delete Event</button> : null }
                        </div>
                    </div> 
                </Form>
            </EditSection>
        );
    }
}

export default EditEvents;