/* Packages */
import * as React from "react";
import { Component } from "react";

/* Types & Interfaces */
import { xAlignment, yAlignment, IDeckProps, ICardProps, ICardState, IDeckStyles, ICardStyles } from "../index";

/* Shared Constants */
//Box-sizing-related shared styles
const sharedStyleBoxSizing: React.CSSProperties = {
  boxSizing: 'border-box'
};

//Flex-related shared styles
const sharedStyleFlex: React.CSSProperties = {
  display: 'flex',
  msFlex: 'flex',
  WebkitFlex: 'flex'
};

/* Shared Helpers */
//Get the alignment CSS styles based on user-defined horizontal values
const getXJustification = (justification: xAlignment | undefined) => //TODO: Needs to be expanded/modified to handle different flex-directions
  justification === 'center'
    ? 'center'
    : justification === 'right'
      ? 'flex-end'
      : 'flex-start'; //Default, i.e. 'left'

//Get the alignment CSS styles based on user-defined vertical values
const getYAlignment = (alignment: yAlignment | undefined) =>  //TODO: Needs to be expanded/modified to handle different flex-directions
  alignment === 'center'
    ? 'center'
    : alignment === 'bottom'
      ? 'flex-end'
      : 'flex-start'; //Default, i.e. 'top'
      

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
      ...sharedStyleBoxSizing,
      ...sharedStyleFlex, 
      alignItems: getYAlignment(this.props.deckYAlign),
      flexWrap: 'wrap',
      justifyContent: getXJustification(this.props.deckXAlign),
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
    contentPadding: 15,
    contentTextColor: 'black',
    flipSeconds: .75,
    fontFamily: 'inherit',
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
    //Switch the hovered state of the card to its opposite
  _switchHover = (hovered: boolean) => this.setState({isHovered: hovered});

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
    ...sharedStyleFlex,
    backfaceVisibility: 'hidden',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    width: '100%',
    WebkitBackfaceVisibility: 'hidden'
  }

  _style: ICardStyles = {
    container: {
      ...sharedStyleBoxSizing,
      padding: this.props.margin, //Oh-ho! What a dangerous game I play with your emotions...
      perspective: 1000,   
      width: this.props.width,
    },
    card: {
      ...sharedStyleBoxSizing,   
      backgroundColor: this.props.primaryColor,    
      border: '5px solid',
      borderColor: this.props.primaryColor,
      borderRadius: 5,
      boxShadow: '0px 9px 18px 0px',
      cursor: 'pointer',
      fontFamily: this.props.fontFamily,
      height: this.props.height,
      position: 'relative',
      transformStyle: 'preserve-3d',
      transition: `${this.props.flipSeconds}s`, 
      userSelect: 'none',
      width: '100%'
    },
    //Card flip animation based off of solution from the following blog: https://davidwalsh.name/css-flip
    cardFlipped: {
      transform: 'rotateY(-180deg)'
    },
    cardHovered: {
      boxShadow: '0px 10px 36px 5px',
      color: this.props.primaryColor
    },
    title: {
      ...sharedStyleBoxSizing,
      ...sharedStyleFlex,
      color: this.props.titleTextColor,
      fontSize: '1.5em',
      justifyContent: getXJustification(this.props.titleXAlignment),
      padding: 10,
      width: '100%'
    },
    front: {
      ...sharedStyleFlex,
      ...this._sharedStyleFrontBack,
      transform: 'rotateY(0deg)',
      zIndex: 2
    },
    back: {
      ...this._sharedStyleFrontBack,
      transform: 'rotateY(180deg)'
    },
    content: {
      ...sharedStyleBoxSizing,
      ...sharedStyleFlex,
      backgroundColor: this.props.secondaryColor,
      color: this.props.contentTextColor,
      flex: 1,
      fontSize: '1.2em',
      overflowY: 'auto',
      padding: this.props.contentPadding,
      width: '100%'
    }
  };

  /* Render */
  render() {
    //Destructure objects
    const { 
      _style, 
      _onClick,  
      _switchHover, 
      _getNumberOfColumns 
    } = this;

    const { 
      title,
      titleFront, 
      titleBack, 
      front,
      back, 
      xAlignment,
      yAlignment,
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
        onMouseEnter={() => _switchHover(true)} //Add hover state
        onMouseLeave={() => _switchHover(false)} //Remove hover state
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
              titleFront || title
                ? <div 
                    style=
                    {
                      {
                        ..._style.title,
                        alignItems: getYAlignment(yAlignment || titleFrontYAlignment || titleYAlignment),
                        justifyContent: getXJustification(xAlignment || titleFrontXAlignment || titleXAlignment)
                      }
                    }
                  >
                    {
                      titleFront || title
                    }
                  </div> 
                : null 
            }
            <div style=
              {
                {
                  ..._style.content,
                  alignItems: getYAlignment(yAlignment || contentFrontYAlignment || contentYAlignment),
                  justifyContent: getXJustification(xAlignment || contentFrontXAlignment || contentXAlignment)
                }
              }
            >
              {front}
            </div>
          </div>
          <div style={_style.back}>
            { 
              titleBack || title
                ? <div style=
                    {
                      {
                        ..._style.title,
                        alignItems: getYAlignment(yAlignment || titleBackYAlignment || titleYAlignment),
                        justifyContent: getXJustification(xAlignment || titleBackXAlignment || titleXAlignment)
                      }
                    }
                  >
                    {
                      titleBack || title
                    }
                  </div> 
                : null }
            <div style=
              {
                {
                  ..._style.content,
                  alignItems: getYAlignment(yAlignment || contentBackYAlignment || contentYAlignment),
                  justifyContent: getXJustification(xAlignment || contentBackXAlignment || contentXAlignment)
                }
              }
            >
              {back}
            </div>
          </div>
        </div>
      </div>
    );
  }
}