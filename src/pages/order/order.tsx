import * as React from "react";
import { Component } from "react";
import Header from "../../components/header/header";
import './order.css';

class Order extends Component
{
    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        document.head.appendChild(script);
    }

    render() {
        return (
            <div className='order'>
                <Header style={{backgroundPosition: '5% 85%', backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Forder-header.jpg?alt=media&token=4ee5b360-9c6a-459e-971f-abe54877d7cc)'}}>Join Us</Header>
                <div className="row margin-top-15">
                    <div className="col-xs-10 col-xs-offset-1 order-form">
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="row">
                                <div className="col-xs-12" style={{fontSize: '.8em'}}>
                                    * required field
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 col-xs-12">
                                    <label>First Name *</label>
                                    <div><input type="text" className="form-control" name="FirstName" /></div>
                                </div>
                                <div className="col-md-3 col-xs-12">
                                    <label>Last Name *</label>
                                    <div><input type="text" className="form-control" name="LastName" /></div>
                                </div>
                                <div className="col-md-2 col-xs-12">
                                    <label>Phone *</label>
                                    <div><input type="tel" className="form-control" name="Phone" /></div>
                                </div>
                                <div className="col-md-4 col-xs-12">
                                    <label>Email</label>
                                    <div><input type="email" className="form-control" name="Email" /></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 col-xs-12">
                                    <label>Duration *</label>
                                    <div>
                                        <select className="form-control">
                                            <option value="0">Choose a Duration...</option>
                                            <option value="18">18 Weeks</option>
                                            <option value="9">9 Weeks </option>
                                            <option value="1">1 Week</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3 col-xs-12">
                                    <label>Size *</label>
                                    <div>
                                        <select className="form-control">
                                            <option value="0">Choose a Size...</option>
                                            <option value="1">Single (feeds 1-3)</option>
                                            <option value="2">Double (feeds 3-5)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3 col-xs-12">
                                    <label>Pick Up Day *</label>
                                    <div>
                                        <select className="form-control">
                                            <option value="">Choose a Day...</option>
                                            <option value="1">Monday</option>
                                            <option value="2">Wednesday</option>
                                            <option value="3">Thursday</option>
                                            <option value="4">Saturday</option>
                                            <option value="0">Other (prior approval required)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3 col-xs-12">
                                    <label>Pick Up Location *</label>
                                    <div>
                                        <select className="form-control">
                                            <option value="">Choose a Location...</option>
                                            <option value="1">Earth Fresh Acres</option>
                                            <option value="2">Jefferson - Main St.</option>
                                            <option value="3">Lake Mills - Farmers Market</option>
                                            <option value="4">Lake Mills - Lewis Station Winery</option>
                                            <option value="5">Madison</option>
                                            <option value="6">Pewaukee/Waukesha</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <label>Comments</label>
                                    <div>
                                        <textarea className="form-control" name="Comments"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">    
                                <div className="col-xs-12 text-center" style={{padding: 10}}>
                                    <label style={{margin: 0}}><input type="checkbox" name="Agreement" style={{position: 'relative', verticalAlign: 'middle', bottom: 3}} /> I have read and agree to the</label> <a>terms and conditions</a> *
                                </div>
                            </div>
                            <div className="row subtotal">
                                <div className="col-xs-12 text-center">
                                    Subtotal: $0.00
                                </div>
                            </div>
                            <div className="c-order-page-submit">
                                <div>
                                    <div className="g-recaptcha pull-right" data-sitekey="6LdWL1IUAAAAAKryxsYaqR_Jmay0umcmJNQGKr0Q"></div>
                                </div>
                                <div>
                                    <input type="submit" className="btn btn-primary" value="Place Your Order" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Order;