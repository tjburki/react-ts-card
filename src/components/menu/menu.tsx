import * as React from "react";
import { Component } from "react";
import './menu.css';

import { EPage } from '../../shared/types';
import PageLink from '../pageLink/pageLink';
import { kwikConnect, IAppProps } from '../../store/store';

@kwikConnect
class Menu extends Component {
    render() {
        const { page, isAdmin, toggleMobileMenu, mobileMenuOpen } = this.props as IAppProps;
        return (
            <nav className={`c-menu ${(false ? 'open' : '')}`}>
                <i className={`fa fa-bars c-menu-show ${(mobileMenuOpen ? "selected": "")}`} onClick={() => toggleMobileMenu(!mobileMenuOpen)}></i>
                <ul className={mobileMenuOpen ? "mobile-open" : ""}>
                    <PageLink page={EPage.baskets}>
                        <li className={page === EPage.baskets ? 'selected' : ''}>
                            <i className="fa fa-shopping-basket"></i> <span>Baskets</span>
                        </li>
                    </PageLink>
                    <PageLink page={EPage.produce}>
                        <li className={page === EPage.produce ? 'selected' : ''}> 
                        <i className="icon-carrot"></i> <span>Produce</span>
                        </li>
                    </PageLink>
                    <PageLink page={EPage.eggs}>
                        <li className={page === EPage.eggs ? 'selected' : ''}> 
                            <i className="icon-egg"></i> <span>Eggs</span>
                        </li>
                    </PageLink>
                    <PageLink page={EPage.events}>
                        <li className={page === EPage.events ? 'selected' : ''}>
                            <i className="fa fa-calendar"></i> <span>Events</span>
                        </li>
                    </PageLink>
                    <PageLink page={EPage.order}>
                        <li className={page === EPage.order ? 'selected' : ''}>
                            <i className="fa fa-file-text-o"></i> <span>Order</span>
                        </li>
                    </PageLink>
                    <PageLink page={EPage.about}>
                        <li className={page === EPage.about ? 'selected' : ''}>
                            <i className="fa fa-handshake-o"></i> <span>Meet Us</span>
                        </li>
                    </PageLink>
                    { 
                        isAdmin 
                            ?   <PageLink page={EPage.admin}>
                                    <li className={page === EPage.admin ? 'selected' : ''}>
                                        <i className="fa fa-gear"></i> <span>Admin</span>
                                    </li>
                                </PageLink>
                            : null
                    } 
                </ul>
            </nav>
        );
    }
}

export default Menu;