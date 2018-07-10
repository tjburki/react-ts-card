import * as React from "react";
import { Component } from "react";
import { IFullBasket } from '../../shared/interfaces';
import { getProduceColor } from '../../shared/helpers';
import Card from '../../components/card/card';
import Subheader from "../subheader/subheader";
import Content from "../content/content";
import './basket.css';

class Basket extends Component<IFullBasket> {
    render() {
        const { produce, display } = this.props;
        return (
            <Content style={{padding: 0}}>
                <Subheader><div className="c-basket-subheader">{display()}</div></Subheader>
                <Content>
                {
                    produce.map(p => 
                        <Card
                            title={p.title} 
                            color={getProduceColor(p.type)}
                            image={p.image}
                            info={p.info}
                            linksName={'Recipes'}
                            links={p.recipes}
                        />
                    )
                }
                </Content>
            </Content>
        );
    }
}

export default Basket;