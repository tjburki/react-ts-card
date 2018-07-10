import * as React from "react";
import { Component } from "react";
import './App.css';
import { EPage } from './shared/types';
import { kwikConnect, IAppProps } from './store/store';

//Components
import Body from './components/body/body';
import Footer from './components/footer/footer';
import FullPage from './components/fullPage/fullPage';
import PageHeader from './components/pageHeader/pageHeader';

//Pages
import Home from './pages/home/home';
import BasketPage from './pages/basket/basket';
import Produce from './pages/produce/produce';
import Eggs from "./pages/eggs/eggs";
import Events from './pages/events/events';
import Order from './pages/order/order';
import About from './pages/about/about';
import Admin from "./pages/admin/admin";

@kwikConnect
export default class App extends Component {
  public componentWillMount() {
    const { updatePage, toggleMobileMenu } = this.props as IAppProps;
    window.onhashchange = () => {
      updatePage(EPage[window.location.hash.substring(1)]);
      toggleMobileMenu(false);
      document.getElementsByClassName('c-body')[0].scrollTop = 0;
    };
  }

  public render() {
    const props = this.props as IAppProps;    

    return (
      <FullPage>
        <PageHeader />
        <Body> 
          <div className="page-content">
            {
              // props.loading
              //   ? <div style={{position: 'absolute', top: 'calc(50% - 50px)', left: 'calc(50% - 50px)', height: '100px', width: '100px'}}><i className="fa fa-spinner fa-pulse" style={{fontSize: '5em'}}></i></div>
              //   : 
              props.page === EPage.baskets
                  ? <BasketPage />
                  : props.page === EPage.produce
                    ? <Produce produce={props.produce} />
                  : props.page === EPage.eggs
                    ? <Eggs />
                  : props.page === EPage.events
                    ? <Events />
                  : props.page === EPage.order
                    ? <Order />
                  : props.page === EPage.about
                    ? <About />
                  : props.page === EPage.admin && props.isAdmin
                    ? <Admin />
                  : <Home />
            }
          </div>
          <Footer />
        </Body>
      </FullPage>
    );
  }
};