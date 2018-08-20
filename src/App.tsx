import * as React from "react";
import { Component } from "react";
import './App.css';
import Card from "./components/card";

export default class App extends Component {
  public render() {
    return (
      <div>
        <Card title="Test" front="Hey" back="Ho" margin={15} />
        <Card title="Test2" front="Here" back="We Go" isFlipped={true} margin={15} />
      </div>
    );
  }
};