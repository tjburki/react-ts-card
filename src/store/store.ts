import { createStore } from 'redux';
import { connect as reConnect } from 'react-redux';
import { EPage } from '../shared/types';
import { IBasket, IProduce, IBaseBasket, IEvent } from '../shared/interfaces';
import firebase from '../firebase';
import * as moment from 'moment';

interface IState {
    page: EPage,
    produce: IProduce[],
    allProduce: IProduce[],
    baskets: IBasket[],
    events: IEvent[],
    user: any,
    admins: string[],
    isAdmin: boolean,
    loading: number,
    mobileMenuOpen: boolean
}

const defaultState: IState = {
    page: EPage[window.location.hash.substring(1)],
    baskets: [],
    produce: [],
    allProduce: [],
    events: [],
    user: {email: 'tylerjburki@gmail.com', displayName: 'Tyler Burki'},//null,
    admins: [],
    isAdmin: true,//false
    loading: 0,
    mobileMenuOpen: false
};

const _sortProduce = (a: IProduce,b: IProduce):number =>  
    a.active && b.active || !(a.active || b.active)
        ? a.title > b.title
            ? -1
            : 1
        : a.active && !b.active
            ?  -1
            : 1;

const _sortBaskets = (a: IBaseBasket,b:IBaseBasket) => a.end < b.end ? 1 : a.end > b.end ? -1 : 0;

const _sortEvents = (e: IEvent, e2: IEvent) => e.start < e2.start ? 1 : e.start > e2.start ? -1 : 0;

//Reducers
const appReducers = (state: IState = defaultState, action: any) => {
    if (RegExp(/_DB$/).test(action.type)) {
        state = { ...state, loading: RegExp(/^GET_/).test(action.type) ? --state.loading : ++state.loading }
    }

    switch(action.type) { 
        case 'SET_LOADING':
            return {
                ...state,
                loading: state.loading += action.payload
            };
        case 'UPDATE_PAGE':
            return {
                ...state,
                page: action.payload
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAdmin: action.payload && (state.admins as any).includes(action.payload.email)
            }
        case 'TOGGLE_MOBILE_MENU':
            return {
                ...state,
                mobileMenuOpen: action.payload
            }
        case 'GET_ADMINS_FROM_DB':
            return {
                ...state,
                admins: action.payload,
                isAdmin: state.user && action.payload.includes(state.user.email)
            }
        case 'GET_EVENTS_FROM_DB':
            return {
                ...state,
                events: Object.keys(action.payload || {}).map(k => ({...action.payload[k], id: k, start: moment(action.payload[k].start), end: moment(action.payload[k].end) } as IEvent)).sort(_sortEvents)
            }
        case 'GET_PRODUCE_FROM_DB':
            const produceKeys = Object.keys(action.payload || {});
            const allProduce = produceKeys && produceKeys.length ? produceKeys.map(k => { return {...action.payload[k], id: k} as IProduce}).sort(_sortProduce) : [];
            const produce = allProduce.filter(p => p.active);

            return {
                ...state,
                produce: produce,
                allProduce: allProduce
            }
        case 'GET_BASKETS_FROM_DB':
            const basketsKeys = Object.keys(action.payload || {});
            const baskets = (basketsKeys && basketsKeys.length ? basketsKeys.map(k => ({...action.payload[k], id: k, start: moment(action.payload[k].start), end: moment(action.payload[k].end)} as IBasket)) : []).sort(_sortBaskets);
            return {
                ...state,
                baskets: baskets
            }
        case 'SAVE_PRODUCE_TO_DB':
            return {
                
            }
        default:
            return state;
    }
};

//Create Store
export const store = createStore(appReducers);

//Setup our database watchers
store.dispatch({type: 'SET_LOADING', payload: 2});

const produceRef = firebase.database().ref('produce');
produceRef.on('value', (snapshot: any) => {
    store.dispatch({type: 'GET_PRODUCE_FROM_DB', payload: snapshot.val()});
});

const basketsRef = firebase.database().ref('baskets');
basketsRef.on('value', (snapshot: any) => {
    store.dispatch({type: 'GET_BASKETS_FROM_DB', payload: snapshot.val()});
});

const adminsRef = firebase.database().ref('admins');
adminsRef.on('value', (snapshot: any) => {
    store.dispatch({type: 'GET_ADMINS_FROM_DB', payload: snapshot.val()});
});

const saveProduce = (produce: IProduce): any => {
    store.dispatch({type: 'SET_LOADING', payload: 1});
    const id = produce.id;
    delete produce['id']; 
    
    return id ? produceRef.child(id).update(produce) : produceRef.push(produce);
}

const eventsRef = firebase.database().ref('events');
export const saveEvent = (event: IEvent): any => {
    const id = event.id;
    delete event['id'];
    const saveEvent = { ...event, start: event.start.toDate().toString(), end: event.end.toDate().toString() } as any;

    return id ? eventsRef.child(id).update(saveEvent) : eventsRef.push(saveEvent);
}
export const deleteEvent = (id: string): any => {
    return eventsRef.child(id).remove();
}
eventsRef.on('value', (snapshot: any) => {
    store.dispatch({type: 'GET_EVENTS_FROM_DB', payload: snapshot.val()});
});


export const saveBasket = (basket: IBasket): any => {
    const id = basket.id;
    delete basket['id'];
    const saveBasket = { ...basket, start: basket.start.toDate().toString(), end: basket.end.toDate().toString() } as any;
    return id ? basketsRef.child(id).update(saveBasket) : basketsRef.push(saveBasket);
}

export const deleteBasket = (id: string): any => {
    return basketsRef.child(id).remove();
}

//Storage
const storage = firebase.storage().ref();
export const addImage = (name: string, file: Blob | null): any => storage.child(name).put(file);

//Map props
const mapStateToProps = (state:IState): IState => ({ ...state });

//Map dispatch
interface IDispatch {
    updatePage: (page:EPage) => any,
    setUser: (user: any) => any,
    toggleMobileMenu: (open?: boolean) => any,
    saveProduce: (produce: IProduce) => any
}

const mapDispatchToProps = (dispatch:any) => ({
    updatePage: (page: EPage) => dispatch({type: 'UPDATE_PAGE', payload: page}),
    setUser: (user: any) => dispatch({type: 'SET_USER', payload: user}),
    toggleMobileMenu: (open?: boolean) => dispatch({type: 'TOGGLE_MOBILE_MENU', payload: !!open}),
    saveProduce: (produce: IProduce) => saveProduce(produce)
});

//Create general connect function
export const kwikConnect = (component:any): any => reConnect(mapStateToProps, mapDispatchToProps)(component);

export interface IAppProps extends IState, IDispatch {};