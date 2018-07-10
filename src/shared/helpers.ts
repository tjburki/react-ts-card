import { EProduceType } from './types';
import { pipe } from 'ramda';
import { IFullBasket, IBasket, IProduce } from './interfaces';

export const formatDate = (d: Date): string => d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

export const getProduceColor = (type: EProduceType) => type === EProduceType.vegetable ? 'orange' : 'purple';

export const addDays = (days: number, date?: Date): Date => {
    let newDate = date || new Date();
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

export const stopProp = (e: any) =>  { e.stopPropagation(); return e; };
export const targetVal = (e: any) => e.target.value;
export const handleChange = (handler: (value: any) => any) => pipe(targetVal, handler);

export const fillBasket = (b: IBasket, ps: IProduce[]): IFullBasket => ({
    produce: (b.produceIds || []).map(i => ps.find(p => p.id === i) as IProduce),
    start: b.start,
    end: b.end,
    id: b.id,
    display: () => `${formatDate(b.start.toDate())}${!b.start.isSame(b.end) ? ` - ${formatDate(b.end.toDate())}` : ''}`
});
//Want to reduce one interface to another
// export const dropBack = <TFrom extends TTo, TTo>(obj: TFrom): TTo => {
//     debugger;
//     const extraProps = Object.keys(obj as TTo).filter(k => {debugger; return !obj.hasOwnProperty(k)});
//     extraProps.forEach(ep => delete obj[ep]);
//     return obj as TTo;
// }