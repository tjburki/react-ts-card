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
          secondaryColor='purple'
          contentTextColor='white'
          cards={[
            {
              front: 'Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf Hey lfsa fasfd asdf  asdfd asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf ',
              back: 'Ho'
            },
            {
              title: 'Test2',
              titleFront: 'Hello',
              titleBack: 'There',
              front: <div style={{backgroundColor: 'orange'}}>Hello there</div>,
              back: <div style={{backgroundColor: 'orange'}}>Hello there</div>,
              isFlipped: true,
              primaryColor: 'red'
            },
            {
              title: 'Test3',
              front: 'Here',
              back: 'We Go Again'
            },
            {
              title: 'Test4',
              front: 'WOW',
              back: 'So Cool!'
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