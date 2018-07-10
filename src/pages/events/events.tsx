import * as React from "react";
import { Component } from "react";
import Header from "../../components/header/header";
import Event from "../../components/event";
import { kwikConnect, IAppProps } from "../../store/store";

@kwikConnect
class Events extends Component
{
    render() {
        const {events} = this.props as IAppProps;

        return (
            <div>
                <Header style={{backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Fevents-header.jpg?alt=media&token=88eee455-8a58-4625-8088-099996c53d9c)'}}>Events</Header>
                <div>
                    {
                        events.length 
                            ? events.map(e => <Event {...e} />)
                            : 'Nothing to see here'
                    }
                </div>
            </div>
        );
    }
}

export default Events;