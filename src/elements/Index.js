import React, { Component } from 'react';

import WrapElements from './WrapElements';

import StylesDefualt from '../styles/Index';

export default class Index extends Component {
    
    state = {
        nameElStyles: {},
        allElStyles: {},
        defStyles: {},
        dataElem: {},
        snapshot: ''
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        const { configForm, name } = nextProps,
            element = configForm.elements[name], 
            type =  element.type,
            nameElStyles = configForm.styles.nameElements[name] || {},
            allElStyles = configForm.styles.allElements,
            defStyles = StylesDefualt.allElements,
            newState = {
                nameElStyles, allElStyles, defStyles,
                dataElem: {
                    name, element, 
                    value:  configForm.formData[name] ? configForm.formData[name] : '',
                    error: configForm.formErrors[name] ? configForm.formErrors[name] : false,
                    stylesElem: nameElStyles[type] || allElStyles[type] || defStyles[type],
                    stylesError: nameElStyles.error || allElStyles.error || defStyles.error
                }
            },
            snapshot = JSON.stringify(newState);
            

        if(snapshot !== prevState.snapshot)
        {
            return { 
                ...newState, 
                snapshot
            }
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        if(this.state.snapshot === nextState.snapshot)
        {
            return false;
        }
        return true;
    }
    
   
    render() 
    {
        if(this.state.snapshot === '')
        {
            return null;
        }

        const { dataElem, nameElStyles, allElStyles, defStyles } = this.state;
        
        return (
            <WrapElements 
                key={dataElem.name}
                nameElStyles={nameElStyles}
                allElStyles={allElStyles}
                defStyles={defStyles}
                dataElem={dataElem}
                storeForm={this.props.storeForm}
            /> 
        );
    }
};