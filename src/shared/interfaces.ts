import { EProduceType } from './types';
import { Moment } from 'moment';

export interface ILink {
    title: string,
    href: string
}

export interface IBaseBasket {
    id: string,
    start: Moment,
    end: Moment
}

export interface IBasket extends IBaseBasket {  
    produceIds: string[] | null, 
}

export interface IFullBasket extends IBaseBasket {
    produce: IProduce[],
    display(): string
}

export interface IEvent {
    id: string,
    start: Moment,
    end: Moment,
    name: string,
    description: string,
    image: string
}

export interface IRecipe {
    title: string,
    href: string
}

export interface IBaseProduce { 
    title: string,
    image: string,
    info: string,
    recipes: IRecipe[] | null,
    type: EProduceType,
    active: boolean
}

export interface IProduce extends IBaseProduce {
    id: string
}