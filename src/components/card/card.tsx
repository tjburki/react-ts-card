import * as React from "react";
import { Component } from "react";
import './card.css';
import { stopProp } from "../../shared/helpers";

interface IProps {
    title: string,
    color: string,
    image: any,
    info: string,
    linksName: string,
    links: ILink[] | null
}

interface ILink {
    title: string,
    href: string
}

interface IState {
    flipped: boolean
}

class Card extends Component<IProps, IState> {
    state = {
        flipped: false
    }

    onClick = () => {
        this.setState({flipped: !this.state.flipped});
    }

    render() {
        const {  color, image, title, info, linksName, links } = this.props;
        const { flipped } = this.state;
        return (
            <div className={'c-card-container ' + (flipped ? 'flipped' : '')} onClick={this.onClick}>
                <div className={`c-card border-${color} back-${color} shadow-${color}`}>
                    <div className ='front'>
                        <div className={'title'}>
                            {title}
                        </div>
                        <div className={`info back-light-${color}`}>
                            <img src={image} />
                        </div>
                    </div>
                    <div className='back'>
                        <div className={'title'}>
                            {title} (Info)
                        </div>
                        <div className={`info back-light-${color}`}>
                            <div>
                                {info}
                            </div>
                            {links && links.length ?
                                <div>
                                    <div className="links-header">
                                        <i className="fa fa-cutlery"></i>{linksName}
                                    </div>
                                    <div>
                                        {
                                            links 
                                                ? links.map(r => <div><a onClick={stopProp} href={r.href} target="_blank">{r.title}</a></div>) 
                                                : null
                                        }
                                    </div>
                                </div>
                                : null
                            } 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;