import * as React from 'react';
import {Component} from 'react';

import Form from '../../../components/form';
import EditSection from '../../../components/editSection';

import { kwikConnect, IAppProps } from '../../../store/store';
import { IProduce, IRecipe } from '../../../shared/interfaces';
import { EProduceType } from '../../../shared/types';
import { addImage } from '../../../store/store';

import { handleChange } from '../../../shared/helpers';

interface IState {
    editProduce: IProduce,
    disabled: boolean
}

@kwikConnect
class EditProduce extends Component<any, IState> {
    newProduce: IProduce = {
        id: '',
        title: '',
        image: '',
        info: '',
        recipes: null,
        type: EProduceType.vegetable,
        active: true
    }
    
    state = {
        editProduce: this.newProduce,
        disabled: false
    }

    _saveProduce = () => {
        debugger;
        const { editProduce } = this.state;
        const { saveProduce } = this.props;
        this.setState({disabled: true});

        saveProduce({...editProduce})
                .then((db: any) => {
                    debugger;
                    this.setState({
                        editProduce: {
                            ...editProduce, 
                            id: db ? db.key : editProduce.id
                        }
                    })
                })
                .then(() => this.setState({disabled: false}));
    }

    _changeEditProduce = (value: string) =>{ 
        const { allProduce } = this.props;
        let np = allProduce.find((p: IProduce) => p.id === value) || this.newProduce; 
        this.setState({editProduce: {...np}});
    }

    _addProduceImage = (e: any) => {
        const image = e.target.files && e.target.files.length ? e.target.files[0] : null;
        const { editProduce } = this.state;
        if (!image) return;

        this.setState({disabled: true});
        addImage(`produce/${editProduce.title}`, image).then((snapshot: any) => this.setState({editProduce: {...editProduce, image: snapshot.downloadURL}, disabled: false}));
    }
    _updateTitle = (value: string) => this.setState({editProduce: { ...this.state.editProduce, title: value }});
    _updateInfo = (value: string) => this.setState({editProduce: {...this.state.editProduce, info: value}});
    _deactivateProduce = () => this.setState({editProduce: {...this.state.editProduce, active: false}});
    _activateProduce = (active: boolean) => this.setState({editProduce: {...this.state.editProduce, active: active}}, () => this._saveProduce());
    _updateType = (value: string) => this.setState({editProduce: {...this.state.editProduce, type: parseInt(value)}});

    _addRecipe = () => { 
        const { editProduce } = this.state;
        let newRecipes = editProduce.recipes || [] as IRecipe[]; 
        newRecipes.unshift({title: '', href: ''}); 
        this.setState({editProduce:{...editProduce, recipes: newRecipes}});
    }

    _updateRecipeTitle = (e: any, i: number) => {
        const { editProduce } = this.state;
        let newRecipes = editProduce.recipes || [] as IRecipe[]; 
        newRecipes[i].title = e.target.value; 
        this.setState({editProduce:{...editProduce, recipes: newRecipes}});
    }

    _updateRecipeHref = (e: any, i: number) => { 
        const { editProduce } = this.state;
        let newRecipes = editProduce.recipes || [] as IRecipe[]; 
        newRecipes[i].href = e.target.value; 
        this.setState({editProduce:{...editProduce, recipes: newRecipes}});
    }

    _deleteRecipe = (i: number) => { 
        const { editProduce } = this.state;
        let newRecipes = editProduce.recipes || [] as IRecipe[]; 
        newRecipes.splice(i, 1); 
        this.setState({editProduce:{...editProduce, recipes: newRecipes}});
    }

    render() {
        const { allProduce } = this.props as IAppProps;
        const { editProduce, disabled } = this.state;

        return (
            <EditSection 
                title='Produce'
                onSelect={handleChange(this._changeEditProduce)}
                selectOptions={
                    allProduce.map(p => ({
                        value: p.id, 
                        display: `${p.title}${(!p.active ? ' (Inactive)' : '')}`, 
                        active: p.active
                    }))
                }
                selectValue={editProduce.id}
            >
                <Form onSubmit={this._saveProduce} disabled={disabled} style={{backgroundColor: '#FFF', borderTop: '3px solid rgb(74, 46, 28)'}}>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Name</label>
                            <div>
                                <input required className="form-control" type="text" value={(editProduce as IProduce).title} onChange={handleChange(this._updateTitle)} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Info</label>
                            <div>
                                <textarea required className="form-control" value={(editProduce as IProduce).info} onChange={handleChange(this._updateInfo)}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Type</label>
                            <div>
                                <select required className="form-control" value={(editProduce as IProduce).type} onChange={handleChange(this._updateType)}>
                                    <option value="0">Vegetable</option>
                                    <option value="1">Fruit</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Image</label>
                            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <div>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        style={{height: 100, width: 100, fontSize: 75, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 10}}
                                        onClick={() => editProduce.title ? (this.refs.image as any).click() : (this.refs.submit as any).click()}
                                    >
                                        <i className="fa fa-camera"></i>
                                    </button>
                                </div>
                                <div>
                                    {editProduce.image ? <img src={editProduce.image} style={{maxHeight: 100}} /> : <i style={{fontSize: 50, fontStyle: 'italic', color: '#BBB'}}>No image selected</i>}
                                </div>
                                <input type="file" ref="image" className="form-control hidden" accept="image/*;capture=camera" onChange={this._addProduceImage} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div style={{padding: 5, border: '1px solid #CCC', borderRadius: 5}}>
                                <label>Recipes</label>
                                <div className="row">
                                    <div className="col-xs-12 text-center">
                                        <button type="button" className="btn btn-warning" onClick={this._addRecipe}>
                                            <i className="fa fa-plus"></i> Add
                                        </button>
                                    </div>
                                </div>
                                {
                                    (editProduce.recipes || [] as IRecipe[]).length ? 
                                    <div className="row">
                                        <div className="col-xs-5" style={{paddingRight: 5}}>
                                            <label>Title</label>
                                        </div>
                                        <div className="col-xs-5" style={{paddingLeft: 0}}>
                                            <label>Link</label>
                                        </div>
                                    </div> : null
                                }
                                { 
                                    (editProduce.recipes || [] as IRecipe[]).map((r, i) => 
                                        <div className="row">
                                            <div className="col-xs-5" style={{paddingRight: 5}}>
                                                <input required type="text" className="form-control" value={r.title} onChange={e => this._updateRecipeTitle(e, i)} />
                                            </div>
                                            <div className="col-xs-5" style={{paddingLeft: 0, paddingRight: 5}}>
                                                <input required type="text" className="form-control" value={r.href} onChange={e => this._updateRecipeHref(e, i)} />
                                            </div>
                                            <div className="col-xs-2" style={{paddingLeft: 0, textAlign: 'center'}}>
                                                <div style={{display: 'flex', alignItems: 'center', fontSize: 30, height: '100%'}}>
                                                    <i className="fa fa-trash-o delete" title="Delete" onClick={() => this._deleteRecipe(i)}></i>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 text-center" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse'}}>
                            <button type="submit" ref="submit" className="btn btn-success"><i className="fa fa-save"></i> Save Produce</button>
                            { editProduce.id && editProduce.active 
                                ? <button type="button" onClick={() => this._activateProduce(false)} className="btn btn-warning"><i className="fa fa-arrow-circle-o-down"></i> Deactivate Produce</button> 
                                : !!editProduce.id
                                    ? <button type="button" onClick={() => this._activateProduce(true)} className="btn btn-warning"><i className="fa fa-arrow-circle-o-up"></i> Activate Produce</button> 
                                    : null }
                        </div> 
                    </div>
                </Form>
            </EditSection>
        );
    }
}

export default EditProduce;