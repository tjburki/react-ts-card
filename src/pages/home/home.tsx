import * as React from "react";
import { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import { Section } from '../../components/layout';
import './home.css';

class Home extends Component
{
    render() {
        return (
            <div className='home'>
            <div className="row">
            <div className='col-xs-12'>
                <Carousel axis="horizontal" showThumbs={false} showArrows={true} dynamicHeight infiniteLoop autoPlay showStatus={false} interval={5000} transitionTime={1000}>
                    <div>
                        <img src={'https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Froots.jpg?alt=media&token=bb2e7339-466c-48b1-ac0d-e818b657309d'} />
                        <p className="carousel-legend">Sign up for a CSA Share today!</p>
                    </div>
                    <div>
                        <img src={'https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Fpeppers.jpg?alt=media&token=39fd9762-07d3-4f30-b0e7-4ca5668cbc61'} />
                        <p className="carousel-legend">Check Out Our Latest Market Basket</p>
                    </div>
                    <div>
                        <img src={'https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Ffamily-garden.jpg?alt=media&token=2645dd86-b5db-4269-9a3c-c055e5c08cf7'} />
                        <p className="carousel-legend">Family Owned Since Not That Long Ago</p>
                    </div>
                    <div>
                        <img src={'https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Fpumpkin-patch.jpg?alt=media&token=b3ffcba2-9d3d-40a1-a197-084ed5c2f5b9'} />
                        <p className="carousel-legend">Fall is in the air in like 6 months!  Get your perfect carving pumpkin today!</p>
                    </div>
                </Carousel>
            </div>
            </div>
            <Section>
                <div className="row" style={{fontSize: '5em', fontWeight: 'bold'}}><div className="col-xs-5 col-xs-offset-1">Know Your Farmer.</div><div className="col-xs-5">Know Your Food.</div></div>
                <div className="row" style={{fontSize: '2em'}}>
                    <div className="col-xs-5 col-xs-offset-1" style={{fontSize: '.7em'}}>
                        <ul>
                            <li>100 - 97 years of tradition, right here in Lake Mills</li>
                            <li>We are human beings and not farming robots beep boop</li>
                            <li>We'll tell you our whole life story within five minutes of meeting you</li>
                        </ul>
                    </div>
                    <div className="col-xs-5" style={{fontSize: '.7em'}}>
                        <ul>
                            <li>If you want brown eggs, guess where you can get 'em?  That's right, at the store!  Also here.</li>
                            <li>No pesticides, herbicides, or free rides but you've already paid</li>
                            <li>Do you even know what Farm to Table means?</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-5 col-xs-offset-1">
                        <blockquote>
                                <p>The Marty's are pretty cool.  We like hanging out with them because they are such friendly people.  What a beautiful, healthy, fabulous group of human beings.  Definitely not farming robots.</p>
                                <p className="author">- John Example, Lake Mills</p>
                        </blockquote>
                    </div>
                    <div className="col-xs-5">
                        <blockquote>
                            <p>I usually eat at Taco Bell so this is a big step up for me!  Nothing better than biting into a fresh, organically grown carrot!  The only thing I didn't like were the nuts and bolts I found in my last basket.  I mean the motor oil tasted OK but I was kinda like wha?</p>
                            <p className="author">- Jane Example, Jefferson</p>
                        </blockquote>
                    </div>
                </div>
                </Section>
            <div className="row info-section" style={{padding: 0}}>
            <div className="col-xs-6 section text-left" style={{backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Ffamily-chickens.jpg?alt=media&token=8372ce25-14e3-4bc6-b7d5-a4ea54da69d8)`, backgroundSize:'cover', color: 'white !important'}}>
                <div><a>
                <h1>Fresh, free-range eggs</h1>
                <h2>Orange yolks and pristine whites</h2></a>
                </div>
            </div>
            <div className="col-xs-6 section text-right"  style={{backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Ffield.jpg?alt=media&token=04defeee-3243-49f3-9a9e-7401700755f3)`, backgroundSize:'cover', color: 'white',textDecoration: 'none'}}>
                <div>
                <a><h1>Crisp, locally-grown produce</h1>
                <h2>Tastes like the good stuff, but way better</h2></a>
                </div>
            </div>
            </div>
          </div>
        );
    }
}

export default Home;