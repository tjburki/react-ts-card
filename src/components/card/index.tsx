//Packages
import * as React from "react";
import { Component } from "react";

//Shared Interfaces
interface IColumnLayout {
  xlColumns?: number,
  lgColumns?: number,
  mdColumns?: number,
  smColumns?: number,
  xsColumns?: number,
  xlSize?: number,
  lgSize?: number,
  mdSize?: number,
  smSize?: number,
  xsSize?: number
}

//Component Interfaces
interface IDeckProps extends ICardProps {
  cards: ICardProps[]
}

interface ICardProps extends IColumnLayout {
  //Id/Key
  id?: any;

  //Titles
  title?: string;
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

  //Flipping
  isFlippable?: boolean;
  isFlipped?: boolean;
  allowFlipOnAnchor?: boolean;
  flipSeconds?: number;

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

interface ICardState {
  flipped: boolean;
  isHovered: boolean;
  windowSize: number;
}

//Style Interfaces
interface IDeckStyles {
  container: React.CSSProperties;
}

interface ICardStyles {
  container: React.CSSProperties;
  card: React.CSSProperties;
  cardFlipped: React.CSSProperties;
  cardHovered: React.CSSProperties;
  front: React.CSSProperties;
  back: React.CSSProperties;
  title: React.CSSProperties;
  content: React.CSSProperties;
}

//Deck
export class Deck extends Component<IDeckProps> {
  //Initialize State
  state = {
    windowSize: window.innerWidth
  }

  //Styles
  _style: IDeckStyles = {
    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      width: '100%',
      padding: 15,
      boxSizing: 'border-box'
    }
  };

  render() {
    //Destructure objects
    const { _style } = this;
    const { cards } = this.props;
    const cardProps = this.props as ICardProps; //TODO: This includes all props so fix it

    return (
      <div style={_style.container}>
        { cards.map((c, i) => <Card key={c.id || i}
          { //Pass the rest of the props
            ...{
              ...cardProps, //Card properties passed in to Deck as defaults
              ...c //Individual card properties passed in that can overwrite Deck defaults
            }
          } 
        /> ) }
      </div>
    );
  }
}

//Card
export class Card extends Component<ICardProps, ICardState> {
  //Default Properties
  static defaultProps: ICardProps = {
    isFlippable: true,
    isFlipped: false,
    flipSeconds: .75,
    height: 200,
    allowFlipOnAnchor: false,
    primaryColor: 'black',
    secondaryColor: 'white',
    titleTextColor: 'white',
    contentTextColor: 'black',
    margin: 15
  };

  //Initialize State
  state: ICardState = {
    flipped: !!this.props.isFlipped,
    isHovered: false,
    windowSize: window.innerWidth
  };

  //Styles
  _sharedStyleBoxSizing: React.CSSProperties = {
    boxSizing: 'border-box'
  }

  _sharedStyleFrontBack: React.CSSProperties = {
    backfaceVisibility: 'hidden', 
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }

  _style: ICardStyles = {
    container: {
      perspective: 1000,
      padding: this.props.margin,
      width: this.props.width,
      ...this._sharedStyleBoxSizing
    },
    card: {
      width: '100%',
      height: this.props.height,
      borderRadius: 5,
      border: '5px solid',
      userSelect: 'none',
      boxShadow: '0px 9px 18px 0px',
      cursor: 'pointer',
      transition: `${this.props.flipSeconds}s`,
      transformStyle: 'preserve-3d',
      position: 'relative',
      backgroundColor: this.props.primaryColor,
      borderColor: this.props.primaryColor,
      ...this._sharedStyleBoxSizing
    },
    cardFlipped: {
      transform: 'rotateY(-180deg)'
    },
    cardHovered: {
      boxShadow: '0px 10px 18px 3px',
      color: this.props.primaryColor
    },
    front: {
      ...this._sharedStyleFrontBack,
      transform: 'rotateY(0deg)'
    },
    back: {
      ...this._sharedStyleFrontBack,
      transform: 'rotateY(180deg)'
    },
    title: {
      padding: 10,
      width: '100%',
      fontSize: '1.5em',
      color: this.props.titleTextColor,
      ...this._sharedStyleBoxSizing
    },
    content: {
      padding: 15,
      width: '100%',
      fontSize: '1.2em',
      textAlign: 'center',
      flex: 1,
      overflowY: 'auto',
      color: this.props.contentTextColor,
      backgroundColor: this.props.secondaryColor,
      ...this._sharedStyleBoxSizing
    }
  };

  //Handlers
  _onClick = (e: any) => {
    const { onClick, isFlippable, allowFlipOnAnchor } = this.props;

    //Flip the card if allowed
    //Card must be flippable and the click target must not be an anchor or has the option to allow for anchor flips
    if (isFlippable && (allowFlipOnAnchor || e.target.tagName !== "a")) this.setState({ flipped: !this.state.flipped });

    //If the user passed on onClick handler, call it
    if(onClick) onClick();
  }

  //Calculate Columns
  _xsColumns = this.props.xsColumns || 1;
  _smColumns = this.props.smColumns || this._xsColumns;
  _mdColumns = this.props.mdColumns || this._smColumns;
  _lgColumns = this.props.lgColumns || this._mdColumns;
  _xlColumns = this.props.xlColumns || this._lgColumns;

  //Helpers
  _switchHover = () => this.setState({isHovered: !this.state.isHovered});
  _updateWidowSize = () => this.setState({windowSize: window.innerWidth});
  _getNumberOfColumns = () => 
    this.state.windowSize >= (this.props.xlSize || 1200)
      ? this._xlColumns
      : this.state.windowSize >= (this.props.lgSize || 1000)
        ? this._lgColumns
        : this.state.windowSize >= (this.props.lgSize || 800)
          ? this._mdColumns
          : this.state.windowSize >= (this.props.lgSize || 600)
            ? this._smColumns
            : this._xsColumns;

  //Lifecycle
  componentDidMount() {
    window.addEventListener('resize', this._updateWidowSize);
  }
 
  componentWillUnmount() {
      window.removeEventListener('resize', this._updateWidowSize);
  }

  //Render
  render() {
    //Destructure objects
    const { _style, _onClick, _switchHover, _getNumberOfColumns } = this;
    const { title, front, back, style, width } = this.props;
    const { flipped, isHovered } = this.state;
    const containerWidth = width || `${100 /  _getNumberOfColumns()}%`; //Split the cards into columns

    return (
      <div
        style={{..._style.container, width: containerWidth, ...style}}
        onClick={_onClick}
        onMouseEnter={_switchHover}
        onMouseLeave={_switchHover}
      >
        <div style={{..._style.card, ...(isHovered ? _style.cardHovered : {}), ...(flipped ? _style.cardFlipped : {})}}>
          <div style={_style.front}>
            { title ? <div style={_style.title}>{title}</div> : null }
            <div style={_style.content}>
              <div>{front}</div>
            </div>
          </div>
          <div style={_style.back}>
            { title ? <div style={_style.title}>{title}</div> : null }
            <div style={_style.content}>
              <div>{back}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}