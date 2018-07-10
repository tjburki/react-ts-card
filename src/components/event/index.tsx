import * as React from 'react';
import {Component} from 'react';
import { IEvent } from '../../shared/interfaces';

class Event extends Component<IEvent> {
    render() {
        return (
            <div style={{border: '1px solid black', padding: 15, margin: 15}}>
                <div>{this.props.name}</div>
                <div>{this.props.start.toString()} - {this.props.end.toString()}</div>
                <div>{this.props.description}</div>
                <img style={{maxHeight: 200, maxWidth: 200}} src={this.props.image} />
            </div>
        );
    }
}

export default Event;