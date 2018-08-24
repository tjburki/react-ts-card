import * as React from "react";
import { Component } from "react";
import './App.css';
import { Deck } from "./components/card";

export default class App extends Component {
  public render() {
    return (
      <div>
        <Deck
          xlColumns={5}
          lgColumns={4}
          mdColumns={3}
          smColumns={2}
          deckXAlign='center'
          primaryColor='#c5050c'
          secondaryColor='white'
          contentTextColor='black'
          titleXAlignment='center'
          cards={[
            {
              titleXAlignment: 'right',
              titleBack: 'Hey there what is going on broski nice to see you!',
              front: 'Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf ',
              back: 'Ho'
            },
            {
              titleFront: 'Left Aligned',
              titleBack: 'Right Aligned',
              titleFrontXAlignment: 'left',
              titleBackXAlignment: 'right',
              front: <a href="#">Will Not Flip On Link Click</a>,
              back: <div style={{fontStyle: "italic"}}>See, you didn't see me when you clicked the link</div>
            },
            {
              title: 'Center Aligned',
              titleXAlignment: 'center',
              allowFlipOnAnchor: true,
              front: <a href="#">Will Flip On Link Click</a>,
              back: 'Clicked the link, perhaps?'
            },
            {
              title: 'Vertical-ness',
              front: 'Right in the center',
              back: 'Started from the bottom',
              contentFrontXAlignment: 'center',
              contentFrontYAlignment: 'center',
              contentBackXAlignment: 'center',
              contentBackYAlignment: 'bottom'
            },
            {
              title: 'Test5',
              front: 'NewLine!fasfdasdfasdffffffff',
              back: 'So Cool!'
            }
          ]}
        />
      </div>
    );
  }
};