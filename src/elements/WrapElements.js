import React from 'react';
import { View } from 'react-native';

import ViewText from '../custom/ViewText';

import SwitchElements from './SwitchElements';


const WrapElements = ({ dataElem, nameElStyles, allElStyles, defStyles, storeForm }) => 
{
    const { name, element } = dataElem;
     
    return (
        <View style={nameElStyles.container || allElStyles.container || defStyles.container}>
            {element.title && 
                <ViewText 
                    text={element.title}
                    styles={nameElStyles.title || allElStyles.title || defStyles.title}
                />
            }
            {element.description && 
                <ViewText 
                    text={element.description}
                    styles={nameElStyles.description || allElStyles.description || defStyles.description}
                />
            }
            <SwitchElements 
                key={name}
                dataElem={dataElem}
                storeForm={storeForm}
            />
            {element.hint && 
                <ViewText 
                    text={element.hint}
                    styles={nameElStyles.hint || allElStyles.hint || defStyles.hint}
                />
            }
        </View> 
    );
}
export default WrapElements;