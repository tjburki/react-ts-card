import * as React from "react";
import { Component } from "react";
import Basket from '../../components/basket/basket';
import { Section } from "../../components/layout";
import Header from "../../components/header/header";
import './basket.css';
import { kwikConnect, IAppProps } from "../../store/store";
import { fillBasket } from "../../shared/helpers";

@kwikConnect
class BasketPage extends Component {
  render() {
    const { baskets, allProduce } = this.props as IAppProps;
    const fullBaskets = baskets.map(b => fillBasket(b, allProduce));

    return (
      <div className='baskets'>
          <Header style={{backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Fcurrent-basket-header.jpg?alt=media&token=fc209fb8-c455-4419-b374-803156fa59d1)'}}>
            Market Baskets
          </Header>
          {
            fullBaskets.length 
              ? <Basket {...fullBaskets[0]} /> 
              : <div style={{fontStyle: 'italic', fontSize: '3em', color: '#AAA', textAlign: 'center'}}>No baskets set up yet</div>
          } 
          <Section className="c-basket-page-promo-section">
            <img src={'https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/marketing%2Fhappykid.png?alt=media&token=e54da63d-e596-49e6-be91-83497f17474e'} style={{maxWidth: 400}} />
            <div>
              <div style={{fontSize: '5em', fontWeight: 'bold'}}>
                Want in?
              </div>
              <div className="c-basket-page-promo-section-text" style={{fontSize: '2em'}}>
                <div>
                  We're always putting something new in our baskets
                </div>
                <div>
                  <a href="#order">Sign up today to get a fresh selection of produce every week!</a>
                </div>
              </div>
            </div>
          </Section>
          {
            fullBaskets.length > 1 ? fullBaskets.slice(1).map(p =>
              <Basket {...p} />
            ) : null
          } 
      </div> 
    );
  }
}

export default BasketPage;