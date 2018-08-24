React TS Card
=============

What is it?
-----------
### Practical
React TS Cards are responsive containers built with React & TypeScript that you can use to quickly segregate information in your UI.
 
### Responsive
Based on a flexbox column/grid system, it's simple to size your Cards for every screen.

### Configurable
Each card can accept a plethora of options to align and format the content, or take action on certain events.

### Fun!
Cards flip when clicked, revealing additonal content and improving your user experience.

Components
----------
### Card
Cards can be used individually, or as part of a <a href="#deck">Deck</a>.

#### Options

##### Control
`id?: any`: User-supplied Id for card, will be used as key for iteration (otherwise index)  

##### Title
`title?: any`: The title of the card, front and back (can be JSX/TSX)  
`titleFront?: any`: The title of the card, front (can be JSX/TSX, overrides title)  
`titleBack?: any`: The title of the card, back (can be JSX/TSX, overrides title)  

##### Color
`titleTextColor?: string`: The color of the title text, default 'white'  
`contentTextColor?: string`: The color of the content text, default 'black'  
`primaryColor?: string`: The primary color of the card (header, border, hover color), default 'black'  
`secondaryColor?: string`: The secondary color of the card (content), default 'white'  

##### Spacing
`margin?: number | string`: Space between this card and others elements on the page, default 15  
`width?: number | string`: Specific width of the card (CSS style)  
`maxWidth?: number | string`: Maximum width of the card (CSS style)  
`height?: number | string`: Height of the card, default 200   
`contentPadding?: number | string`: Padding for content, default 15  

##### Flip
`isFlippable?: boolean`: Can this card be flipped, default true  
`isFlipped?: boolean`: Is this card currently flipped, default false  
`allowFlipOnAnchor?: boolean`: Should the card flip when an anchor tag is clicked, default false  
`flipSeconds?: number`: The length of the flipping animation, default .75  

##### Content
`front?: any`: What appears on the front of the card, can be text or JSX/TSX  
`back?: any`: What appears on the back of the card, can be text or JSX/TSX  

##### Alignment
`xAlignment?: xAlignment`: How everything on the card should be aligned horizontally (fall back), default 'left'  
`yAlignment?: yAlignment`: How everything on the card should be aligned vertically (fall back), default 'top'                           
`titleXAlignment?: xAlignment`: How the title should be aligned horizontally (overriden by side-specific), default 'left'  
`titleYAlignment?: yAlignment`: How the title should be aligned vertically (overriden by side-specific), default 'top'  
`titleFrontXAlignment?: xAlignment`: How the front title should be aligned horizontally, default 'left'  
`titleFrontYAlignment?: yAlignment`: How the front title should be aligned vertically, default 'top'  
`titleBackXAlignment?: xAlignment`: How the back title should be aligned horizontally, default 'left'  
`titleBackYAlignment?: yAlignment`: How the back title should be aligned vertically, default 'top'  
`contentXAlignment?: xAlignment`: How the content should be aligned horizontally (overridden by side-specific), default 'left'  
`contentYAlignment?: yAlignment`: How the content should be aligned vertically (overridden by side-specific), default 'top'  
`contentFrontXAlignment?: xAlignment`: How the front content should be aligned horizontally, default 'left'  
`contentFrontYAlignment?: yAlignment`: How the front content should be aligned vertically, default 'top'  
`contentBackXAlignment?: xAlignment`: How the back content should be aligned horizontally, default 'left'  
`contentBackYAlignment?: yAlignment`: How the back content should be aligned vertically, default 'top'   

##### Column
`xlColumns?: number`: # of columns at xlSize screen width (px), all default 1  
`lgColumns?: number`: # cols @ lgSize  
`mdColumns?: number`: # cols @ mdSize  
`smColumns?: number`: # cols @ smSize  
`xsColumns?: number`: # cols @ xsSize  
`xlSize?: number`: Minimum window size (px) for # xlColumns, default 1200  
`lgSize?: number`: Size for lgColumns, default 1000  
`mdSize?: number`: Size for mdColumns, default 800  
`smSize?: number`: Size for smColumns, default 600  
`xsSize?: number`: Size for xsColumns, default 0  

##### Functional
`onClick?: (e?: React.MouseEvent<HTMLElement>) => any`: Additional behavior that should occur when the card is clicked  

### Deck
A collection of <a href="#card">Cards</a>.  All properties of the Card component can be passed in here as a default for the Cards in the collection.

#### Options
##### Content
`cards: ICardProps[]`: List of cards we want to show in the Deck, ICardProps are the options available to Cards  

##### Alignment
`deckXAlign?: xAlignment`: How to align the cards in the deck horizontally, default 'left'  
`deckYAlign?: yAlignment`: How to align the cards in the deck vertically, default 'top'  

Example
--------
Try out the card here: https://codesandbox.io/s/qr37pyqjj

Known Issues
------------
### Sandbox on Mobile
There is an issue with the backface-visibility in the sandbox on mobile where both sides are shown when flipped.  This problem has been alleviated in other environments but has not yet been fixed for the emulator.  Moving more styles of of the .tsx into the .css file might help.

### Browser Compatibility
Everything will be great in a real browser (read: Chrome).  Some older versions of IE (< 11), for example, might have a little trouble.  Even Edge can be rough with the flip animation ::facepalm::, especially in the emulator used by the <a href="#example">Example</a>.    Better compatibility to come!

### Defined Height
Due to the nature of the flipping mechanism, Cards must currently be assigned a static height.  Auto height Cards on the way!

### More Options
Cards are already chock-full of options, but even more will be added like font styling/sizing and support for additional DOM events.