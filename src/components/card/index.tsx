/* Packages */
import * as React from "react";
import { Component } from "react";

/* Shared Constants */
//Box-sizing-related shared styles
const _sharedStyleBoxSizing: React.CSSProperties = {
  boxSizing: 'border-box'
};

//Flex-related shared styles
const _sharedStyleFlex: React.CSSProperties = {
  display: 'flex',
  msFlex: 'flex',
  WebkitFlex: 'flex'
};

/* Shared Types */
type xAlignment = 'left' | 'center' | 'right';
type yAlignment = 'top' | 'center' | 'bottom';

/* Property Interfaces */
interface IDeckProps extends ICardProps {
  cards: ICardProps[]   //List of cards we want to show in the Deck
}

interface ICardProps {
  //Id/Key
  id?: any;                     //User-supplied Id for card, will be used as key for iteration (otherwise index)

  //Titles
  title?: string;               //The title of the card, front and back
  titleFront?: string;          //The title of the card, front (overrides title)
  titleBack?: string;           //The title of the card, back (overrides title)

  //Color
  titleTextColor?: string;      //The color of the title text, default 'white'
  contentTextColor?: string;    //The color of the content text, default 'black'
  primaryColor?: string;        //The primary color of the card (header, border, hover color), default 'black'
  secondaryColor?: string;      //The secondary color of the card (content), default 'white'

  //Format
  margin?: number | string;     //Space between this card and others elements on the page, default 15
  width?: number | string;      //Specific width of the card (CSS style)
  maxWidth?: number | string;   //Maximum width of the card (CSS style)
  height?: number | string;     //Height of the card, default 200 //TODO: Let's get rid of this!  My goal is to have a card that adjusts to content height

  //Flipping
  isFlippable?: boolean;        //Can this card be flipped, default true
  isFlipped?: boolean;          //Is this card currently flipped, default false
  allowFlipOnAnchor?: boolean;  //Should the card flip when an anchor tag is clicked, default false
  flipSeconds?: number;         //The length of the flipping animation, default .75

  //Content
  front?: any;                  //What appears on the front of the card, can be text or JSX/TSX
  back?: any;                   //What appears on the back of the card, can be text or JSX/TSX

  //Title & Content Alignment                         
  titleXAlignment?: xAlignment;         //How the title should be aligned horizontally (overriden by side-specific), default left
  titleYAlignment?: yAlignment;         //How the title should be aligned vertically (overriden by side-specific), default top
  titleFrontXAlignment?: xAlignment;    //How the front title should be aligned horizontally, default left
  titleFrontYAlignment?: yAlignment;    //How the front title should be aligned vertically, default top
  titleBackXAlignment?: xAlignment;     //How the back title should be aligned horizontally, default left
  titleBackYAlignment?: yAlignment;     //How the back title should be aligned vertically, default top
  contentXAlignment?: xAlignment;       //How the content should be aligned horizontally (overridden by side-specific), default, left
  contentYAlignment?: yAlignment;       //How the content should be aligned vertically (overridden by side-specific), default, top
  contentFrontXAlignment?: xAlignment;  //How the front content should be aligned horizontally, default left
  contentFrontYAlignment?: yAlignment;  //How the front content should be aligned vertically, default top
  contentBackXAlignment?: xAlignment;   //How the back content should be aligned horizontally, default left
  contentBackYAlignment?: yAlignment;   //How the back content should be aligned vertically, default top

  //Column Layout
  xlColumns?: number,           //# of columns at xlSize screen width (px)
  lgColumns?: number,           //# cols @ lgSize
  mdColumns?: number,           //# cols @ mdSize
  smColumns?: number,           //# cols @ smSize
  xsColumns?: number,           //# cols @ xsSize
  xlSize?: number,              //Minimum window size (px) for # xlColumns
  lgSize?: number,              //Size for lgColumns
  mdSize?: number,              //Size for mdColumns
  smSize?: number,              //Size for smColumns
  xsSize?: number               //Size for xsColumns

  //Event Handlers
  onClick?: (e?: any) => any;   //Additional behavior that should occur when the card is clicked
}

/* State Interfaces */
interface ICardState {
  flipped: boolean;   //Is the card currently flipped, default false
  isHovered: boolean; //Is the card currently hovered over, default false
  windowSize: number; //The current window size to use for determining width in column layout
}

/* Style Interfaces */
interface IDeckStyles {
  container: React.CSSProperties;
}

interface ICardStyles {
  container: React.CSSProperties;
  card: React.CSSProperties;
  cardFlipped: React.CSSProperties;
  cardHovered: React.CSSProperties;
  title: React.CSSProperties;
  front: React.CSSProperties;
  back: React.CSSProperties;
  content: React.CSSProperties;
}

/*
 *  Deck
 *    Container for cards.
 * 
 *    User can define # of columns at certain screen thresholds, as
 *    well as the width of the thresholds themselves.
 * 
 *    All card properties can be passed to the Deck, which will use
 *    those properties to render the cards, unless overridden by the
 *    card itself.
 */
export class Deck extends Component<IDeckProps> {
  /* Styles */
  _style: IDeckStyles = {
    container: {
      ..._sharedStyleBoxSizing,
      ..._sharedStyleFlex, 
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      padding: 15,
      width: '100%'
    }
  };

  /* Render */
  render() {
    //Destructure objects
    const { 
      _style 
    } = this;

    const { 
      cards 
    } = this.props;

    return (
      <div style={_style.container}>
        { 
          cards.map((c, i) => 
            <Card key={c.id || i} //Use Id or index in array for key
              {
                ...{
                  ...this.props,  //Pass in all properties, which includes all properties available to Cards
                  ...c            //Individual card properties passed in that can overwrite Deck defaults
                }
              } 
            /> 
          ) 
        }
      </div>
    );
  }
}

/*
 *  Card
 *    Flippable information card.
 * 
 *    User can define # of columns at certain screen thresholds, as
 *    well as the width of the thresholds themselves.
 * 
 *    Card will leave room for # of other cards within parent that are
 *    defined in the # of columns at the current screen width.
 * 
 *    Can flip or perform other behaviors on click.
 */
export class Card extends Component<ICardProps, ICardState> {
  /* Default Properties */
  static defaultProps: ICardProps = {
    allowFlipOnAnchor: false,
    contentTextColor: 'black',
    flipSeconds: .75,
    height: 200,
    isFlippable: true,
    isFlipped: false,
    margin: 15,
    primaryColor: 'black',
    secondaryColor: 'white',
    titleTextColor: 'white'
  };

  /* Initialize State */
  state: ICardState = {
    flipped: !!this.props.isFlipped,  //!! => Turn this into bool type in case it is undefined
    isHovered: false,
    windowSize: window.innerWidth     //Initialize to current window size
  };

   /* Handlers */
  //Flip the card if allowed, call any user-defined behavior
  _onClick = (e: any) => {
    const { onClick, isFlippable, allowFlipOnAnchor } = this.props;

    //Flip the card if allowed
    //Card must be flippable and the click target must not be an anchor or has the option to allow for anchor flips
    if (isFlippable && (allowFlipOnAnchor || e.target.tagName.toLowerCase() !== "a")) this.setState({ flipped: !this.state.flipped });

    //If the user passed on onClick handler, call it
    if(onClick) onClick();
  }

  /* Calculate Columns */
  //Determine how many columns we want to show at each threshold, default is 1
  //Use the largest defined value we can find at each window size
  _xsColumns = this.props.xsColumns || 1;
  _smColumns = this.props.smColumns || this._xsColumns;
  _mdColumns = this.props.mdColumns || this._smColumns;
  _lgColumns = this.props.lgColumns || this._mdColumns;
  _xlColumns = this.props.xlColumns || this._lgColumns;

  /* Lifecycle */
  //Add a listener that updates the window size in the card's state on resize
  componentDidMount() {
    window.addEventListener('resize', this._updateWidowSize);
  }
 
  //Remove the window resize listener on unload
  componentWillUnmount() {
      window.removeEventListener('resize', this._updateWidowSize);
  }

  /* Helpers */
  //Get the alignment CSS styles based on user-defined horizontal values
  _getXJustification = (justification: xAlignment | undefined) => //TODO: Needs to be expanded/modified to handle different flex-directions
    justification === 'center'
      ? 'center'
      : justification === 'right'
        ? 'flex-end'
        : 'flex-start'; //Default, i.e. 'left'

  //Get the alignment CSS styles based on user-defined vertical values
  _getYAlignment = (alignment: yAlignment | undefined) =>  //TODO: Needs to be expanded/modified to handle different flex-directions
    alignment === 'center'
      ? 'center'
      : alignment === 'bottom'
        ? 'flex-end'
        : 'flex-start'; //Default, i.e. 'top'

  //Switch the hovered state of the card to its opposite
  _switchHover = () => this.setState({isHovered: !this.state.isHovered});

  //Set the window size in the card's state so we can resize if necessary
  _updateWidowSize = () => this.setState({windowSize: window.innerWidth});

  //Get the number of columns the user wants based on the current window size
  _getNumberOfColumns = () => 
    Math.abs(this.state.windowSize >= (this.props.xlSize || 1200)
      ? this._xlColumns
      : this.state.windowSize >= (this.props.lgSize || 1000)
        ? this._lgColumns
        : this.state.windowSize >= (this.props.lgSize || 800)
          ? this._mdColumns
          : this.state.windowSize >= (this.props.lgSize || 600)
            ? this._smColumns
            : this._xsColumns);

  /* Styles */
  _sharedStyleFrontBack: React.CSSProperties = {
    ..._sharedStyleFlex,
    backfaceVisibility: 'hidden',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    width: '100%'
  }

  _style: ICardStyles = {
    container: {
      ..._sharedStyleBoxSizing,
      padding: this.props.margin, //Oh-ho! What a dangerous game I play with your emotions...
      perspective: 1000,   
      width: this.props.width,
    },
    card: {
      ..._sharedStyleBoxSizing,   
      backgroundColor: this.props.primaryColor,    
      border: '5px solid',
      borderColor: this.props.primaryColor,
      borderRadius: 5,
      boxShadow: '0px 9px 18px 0px',
      cursor: 'pointer',
      height: this.props.height,
      position: 'relative',
      transformStyle: 'preserve-3d',
      transition: `${this.props.flipSeconds}s`, 
      userSelect: 'none',
      width: '100%'
    },
    cardFlipped: {
      transform: 'rotateY(-180deg)'
    },
    cardHovered: {
      boxShadow: '0px 10px 36px 5px',
      color: this.props.primaryColor
    },
    title: {
      ..._sharedStyleBoxSizing,
      ..._sharedStyleFlex,
      color: this.props.titleTextColor,
      fontSize: '1.5em',
      justifyContent: this._getXJustification(this.props.titleXAlignment),
      padding: 10,
      width: '100%'
    },
    front: {
      ..._sharedStyleFlex,
      ...this._sharedStyleFrontBack,
      transform: 'rotateY(0deg)'
    },
    back: {
      ...this._sharedStyleFrontBack,
      transform: 'rotateY(180deg)'
    },
    content: {
      ..._sharedStyleBoxSizing,
      ..._sharedStyleFlex,
      backgroundColor: this.props.secondaryColor,
      color: this.props.contentTextColor,
      flex: 1,
      fontSize: '1.2em',
      overflowY: 'auto',
      padding: 15,  
      textAlign: 'center',
      width: '100%'
    }
  };

  /* Render */
  render() {
    //Destructure objects
    const { 
      _style, 
      _onClick, 
      _getXJustification, 
      _getYAlignment, 
      _switchHover, 
      _getNumberOfColumns 
    } = this;

    const { 
      titleFront, 
      titleBack, 
      front,
      back, 
      titleXAlignment,
      titleYAlignment,
      titleFrontXAlignment,
      titleFrontYAlignment,
      titleBackXAlignment,
      titleBackYAlignment,
      contentXAlignment,
      contentYAlignment,
      contentFrontXAlignment, 
      contentFrontYAlignment, 
      contentBackXAlignment, 
      contentBackYAlignment,
      width 
    } = this.props;

    const { 
      flipped, 
      isHovered 
    } = this.state;

    //Split the cards into columns
    const containerWidth = width || `${ 100 / _getNumberOfColumns() }%`;

    return (
      <div
        style={{..._style.container, width: containerWidth}}
        onClick={_onClick} //Run flip animation (if allowed) and user-defined click actions
        onMouseEnter={_switchHover} //Add hover state
        onMouseLeave={_switchHover} //Remove hover state
      >
        <div 
          style=
            {
              {
                ..._style.card, 
                ...(  //Apply styles if the card is being hovered
                  isHovered 
                    ? _style.cardHovered 
                    : {}
                ), 
                ...(  //Apply styles if the card is being flipped
                  flipped 
                    ? _style.cardFlipped 
                    : {}
                )
              }
            }
        >
          <div style={_style.front}>
            { 
              titleFront
                ? <div 
                    style=
                    {
                      {
                        ..._style.title,
                        alignItems: this._getYAlignment(titleFrontYAlignment || titleYAlignment),
                        justifyContent: _getXJustification(titleFrontXAlignment || titleXAlignment)
                      }
                    }
                  >
                    {
                      titleFront
                    }
                  </div> 
                : null 
            }
            <div style=
              {
                {
                  ..._style.content,
                  alignItems: _getYAlignment(contentFrontYAlignment || contentYAlignment),
                  justifyContent: _getXJustification(contentFrontXAlignment || contentXAlignment)
                }
              }
            >
              <div>{front}</div>
            </div>
          </div>
          <div style={_style.back}>
            { 
              titleBack
                ? <div style=
                    {
                      {
                        ..._style.title,
                        alignItems: this._getYAlignment(titleBackYAlignment || titleYAlignment),
                        justifyContent: _getXJustification(titleBackXAlignment || titleXAlignment)
                      }
                    }
                  >
                    {
                      titleBack
                    }
                  </div> 
                : null }
            <div style=
              {
                {
                  ..._style.content,
                  alignItems: _getYAlignment(contentBackYAlignment || contentYAlignment),
                  justifyContent: _getXJustification(contentBackXAlignment || contentXAlignment)
                }
              }
            >
              <div>{back}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}