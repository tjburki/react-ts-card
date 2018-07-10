import * as React from "react";
import { Component } from "react";
import Header from "../../components/header/header";

class About extends Component
{
    render() {
        return (
            <div>
                <Header style={{backgroundPosition: '5% 20%', backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Ffamily-garden.jpg?alt=media&token=2645dd86-b5db-4269-9a3c-c055e5c08cf7)'}}>Who We Are</Header>
            </div>
        );
    }
}

export default About;