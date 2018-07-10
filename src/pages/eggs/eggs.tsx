import * as React from "react";
import { Component } from "react";
import Header from "../../components/header/header";

class Eggs extends Component
{
    render() {
        return (
            <div>
                <Header style={{backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/earthfreshacres-7fe29.appspot.com/o/general%2Feggs-header.jpg?alt=media&token=f9af6e6b-3278-4446-9143-3f694d096395)'}}>Organic Eggs</Header>
            </div>
        );
    }
}

export default Eggs;