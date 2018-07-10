import * as React from "react";
import { Component } from "react";
import Menu from '../../components/menu/menu';
import { EPage } from '../../shared/types';
import './pageHeader.css';
import PageLink from '../pageLink/pageLink';

class PageHeader extends Component {
  render() {
    return (
        <div className='c-page-header'>
            <div className='c-page-header-logo'>
                <PageLink page={EPage.home}><img className="logo" src={'https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/branding%2Flogo.png?alt=media&token=c1173cab-09c0-4840-89eb-f92f2ddf302f'} /></PageLink>
            </div>
            <div className='c-page-header-info'>
                <div className="c-page-header-contact">
                    <p className="slogan">Know Your Farmer.  Know Your Food.</p>
                    <p><i className="fa fa-phone"></i>(555) 555-5555</p>
                    <p><i className="fa fa-envelope-o"></i>info@efa.com</p>
                </div>
                <div>
                    <Menu />
                </div> 
            </div>
        </div>
    );  
  }
}

export default PageHeader;