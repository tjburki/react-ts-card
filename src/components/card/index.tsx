//Packages
import * as React from "react";
import { Component } from "react";

//Interfaces
interface IProps {
  //Titles
  title: string;
  titleFront?: string;
  titleBack?: string;

  //Color
  titleTextColor?: string;
  contentTextColor?: string;
  primaryColor?: string;
  secondaryColor?: string;

  //Style
  style?: React.CSSProperties;

  //Format
  margin?: number | string;
  width?: number | string;
  maxWidth?: number | string;
  height?: number | string;
  maxHeight?: number | string;

  //Flipping
  isFlippable?: boolean;
  isFlipped?: boolean;
  allowFlipOnAnchor?: boolean;

  //Content
  front?: any; //Expected to be JSX/TSX
  back?: any; //Expected to be JSX/TSX

  //Title & Content Alignment
  titleXAlignment?: string;
  titleYAlignment?: string;
  frontXAlignment?: string;
  frontYAlignment?: string;
  backXAlignment?: string;
  backYAlignment?: string;

  //Event Handlers
  onClick?: (e?: any) => any;
}

interface IState {
  flipped: boolean;
  isHovered: boolean;
}

//Card
export default class Card extends Component<IProps, IState> {
  //Default Properties
  static defaultProps: IProps = {
    title: '',
    isFlippable: true,
    isFlipped: false,
    allowFlipOnAnchor: false,
    primaryColor: '#c5050c',
    secondaryColor: 'white',
    titleTextColor: 'white',
    contentTextColor: '#666'
  };

  //Initialize State
  state: IState = {
    flipped: !!this.props.isFlipped,
    isHovered: false
  };

  //Styles
  _containerStyle: React.CSSProperties = {
    perspective: 1000,
    width: '25%',
    float: 'left',
    padding: this.props.margin
  };

  _cardStyle: React.CSSProperties = {
    height: 250,
    width: '100%',
    borderRadius: 5,
    border: '5px solid',
    userSelect: 'none',
    boxShadow: '0px 9px 18px 0px',
    cursor: 'pointer',
    transition: '.75s',
	  transformStyle: 'preserve-3d',
    position: 'relative',
    backgroundColor: this.props.primaryColor,
    borderColor: this.props.primaryColor
  };

  _cardFlippedStyle: React.CSSProperties = {
    transform: 'rotateY(-180deg)'
  };

  _cardHoveredStyle: React.CSSProperties = {
    boxShadow: '0px 10px 18px 3px',
    color: this.props.primaryColor
  }
  
  _frontBackStyle: React.CSSProperties = {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    width: '100%'
  };

  _frontStyle: React.CSSProperties = {
    ...this._frontBackStyle,
    zIndex: 2,
	  transform: 'rotateY(0deg)'
  };

  _backStyle: React.CSSProperties = {
    ...this._frontBackStyle,
    transform: 'rotateY(180deg)'
  };

  _titleStyle: React.CSSProperties = {
    padding: 5,
    width: '100%',
    fontSize: '1.5em',
    color: this.props.titleTextColor
  };

  _contentStyle: React.CSSProperties = {
    padding: 15,
    fontSize: '1.2em',
    textAlign: 'center',
    height: 200,
    color: this.props.contentTextColor,
    backgroundColor: this.props.secondaryColor
  }

  //Handlers
  _onClick = (e: any) => {
    const { onClick, isFlippable, allowFlipOnAnchor } = this.props;

    //Flip the card if allowed
    //Card must be flippable and the click target must not be an anchor or has the option to allow for anchor flips
    if (isFlippable && (allowFlipOnAnchor || e.target.tagName !== "a")) { 
        this.setState({ flipped: !this.state.flipped })
    }

    //If the user passed on onClick handler, call it
    if(onClick) onClick();
  }

  //Helpers
  _switchHover = () => this.setState({isHovered: !this.state.isHovered});

  //Render
  render() {
    //Destructure objects
    const { _containerStyle, _titleStyle, _cardStyle, _frontStyle, _backStyle, _contentStyle, _cardFlippedStyle, _cardHoveredStyle, _onClick, _switchHover } = this;
    const { title, front, back, style } = this.props;
    const { flipped, isHovered } = this.state;

    return (
      <div
        style={{..._containerStyle, ...style}}
        onClick={_onClick}
        onMouseEnter={_switchHover}
        onMouseLeave={_switchHover}
      >
        <div 
          style={{..._cardStyle, ...(isHovered ? _cardHoveredStyle : {}), ...(flipped ? _cardFlippedStyle : {})}}
        >
          <div style={_frontStyle}>
            <div style={_titleStyle}>{title}</div>
            <div style={_contentStyle}>
              <div>{front}</div>
            </div>
          </div>
          <div style={_backStyle}>
            <div style={_titleStyle}>{title}</div>
            <div style={_contentStyle}>
              <div>{back}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}