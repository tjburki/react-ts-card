import * as React from "react";
import { Component } from "react";
import { addDays } from "../../shared/helpers";
import Content from "../../components/content/content";
import { Section } from '../../components/layout';
import EditProduce from '../../pages/produce/edit';

import './admin.css';
import EditBasket from "../basket/edit";
import EditEvents from "../events/edit";

class Admin extends Component
{   
    state = {
        editBasket: {
            produceIds: null,
            start: new Date(),
            end: addDays(7) //One week from now
        },
        disabled: {
            produce: false
        }
    }
    _editBasket(e: any) {
        console.log(this.state.editBasket);
    }

    render() {
        return (
            <Content className="c-admin-page" style={{padding: '15px 0'}}>
                <div className="row">
                    <div className="col-md-6 col-xs-12">
                        <Section>
                            <EditProduce />
                        </Section>
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <Section>
                            <EditBasket />
                        </Section>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-xs-12">
                        <Section>
                            <EditEvents />
                        </Section>
                    </div>
                </div>
            </Content>
        );
    }
}

export default Admin;