import * as React from "react";
import { Component } from "react";
import Card from '../../components/card/card';
import { EProduceType } from '../../shared/types';
import { IProduce } from '../../shared/interfaces';
import { getProduceColor } from '../../shared/helpers';
import Header from "../../components/header/header";
import Content from "../../components/content/content";

interface IProps {
    produce: IProduce[]
}

class Produce extends Component<IProps, object> {
    render() {
        return (
            <div className='produce'>
                <Header style={{backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Fvegetable-header.jpg?alt=media&token=dbc984fa-62ec-488e-90e6-30bf272b1c50)'}}>Vegetables</Header>
                <Content>
                    {
                        this.props.produce.filter(p => p.type === EProduceType.vegetable).map(
                            p => 
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
                <Header style={{backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Ffruit-header.jpg?alt=media&token=e43010ad-0bc9-4953-a572-0c18b7b9e992)'}}>Fruit</Header>
                <Content>
                    {
                        this.props.produce.filter(p => p.type === EProduceType.fruit).map(
                            p => 
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
            </div>
        );
    }
}

export default Produce;