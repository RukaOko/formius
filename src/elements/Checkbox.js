import React, { Component } from 'react';
import { Switch } from 'react-native';

import ViewText from '../custom/ViewText';
import ElemValidation from '../validation/ElemValidation';

export default class Checkbox extends Component {
  
    state = {
        name: '', 
        value: '', 
        error: false, 
        element: {},
        stylesElem: {},
        stylesError: {},
        snapshot: ''
    }
    
    onValueChange = () => 
    {
        let error = false,
            { value } = this.state;
        const { name, element } = this.state;

        if(typeof value !== 'boolean')
        {
            value = false;
        }
        
        value = !value;

        if(element.validation)
        {
            error = ElemValidation(value, element.validation);
        }

        this.props.storeForm( name, value, error );
        this.setState({ value, error });
        
    }

    
    static getDerivedStateFromProps(nextProps, prevState)
    {
        const snapshot = JSON.stringify(nextProps.dataElem);
        if(snapshot !== prevState.snapshot)
        {
            return { 
                ...nextProps.dataElem,
                snapshot
            }
        }
        return null;
    }

    
    shouldComponentUpdate(nextProps, nextState)
    {
        if(this.state.snapshot === nextProps.snapshot)
        {
            return false;
        }
        return true;
    }


    render() 
    {
        const { error, stylesElem, stylesError, element } = this.state;
        let properties = element.properties ? element.properties : {},
            { value } = this.state;

        if(typeof value !== 'boolean')
        {
            value = false;
        }
        
        return (
            <>
                <Switch
                    value={value}
                    style={stylesElem}
                    onValueChange={this.onValueChange}
                    {...properties}
                />
                {error && 
                    <ViewText 
                        text={error}
                        styles={stylesError}
                    />
                }
           </> 
        );
    }
}