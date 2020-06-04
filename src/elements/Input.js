import React, { Component } from 'react';
import { TextInput } from 'react-native';

import ViewText from '../custom/ViewText';
import ElemValidation from '../validation/ElemValidation';

export default class Input extends Component {
  
    state = {
        name: '', 
        value: '', 
        error: false, 
        element: {},
        stylesElem: {},
        stylesError: {},
        snapshot: ''
    }
    

    onChangeText = (value) => 
    {
        let error = false;
        const { name, element } = this.state;

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
        const { error, value, stylesElem, stylesError, element } = this.state;
        let properties = element.properties ? element.properties : {};

        return (
            <>
                <TextInput
                    onChangeText={this.onChangeText}
                    value={value}
                    style={stylesElem}
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