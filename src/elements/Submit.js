import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import ViewText from '../custom/ViewText';

 const Submit = (props) => 
 {
    const { error, name, stylesElem, stylesError, element } = props.dataElem;
    
    return (
        <>
            <TouchableOpacity 
                style={stylesElem.touchableOpacity}
                onPress={() => props.storeForm(name)}
            >
                <Text style={stylesElem.buttonTitle}>{element.buttonTitle}</Text>
            </TouchableOpacity>
            {error && 
                <ViewText 
                    text={error}
                    styles={stylesError}
                />
            }
        </>
    );
}
export default Submit;