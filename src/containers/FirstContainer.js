import React from 'react';
import { View, ScrollView } from 'react-native';

import StylesDefualt from '../styles/Index';
import ViewText from '../custom/ViewText';
import IndexElements from '../elements/Index';
import SecondContainer from './SecondContainer';

const FirstContainer = ({ containerName, containerStructure, configForm, storeForm }) => {

    const nameStylesUser = configForm.styles.containers[containerName] || {},
        allStylesUser = configForm.styles.containers.allContainers || {},
        defStyles = StylesDefualt.containers.allContainers;
        
    const containerStyles = nameStylesUser.container || allStylesUser.container || defStyles.container,
        titleStyles = nameStylesUser.title || allStylesUser.title || defStyles.title,
        descriptionStyles = nameStylesUser.description || allStylesUser.description || defStyles.description;

    if(containerStructure.elements)
    {
        if(containerStructure.viewType && containerStructure.viewType === 'ScrollView')
        {
            return (
                <ScrollView style={containerStyles}>
                    {containerStructure.title && 
                        <ViewText 
                            text={containerStructure.title}
                            styles={titleStyles}
                        />
                    }
                    {containerStructure.description && 
                        <ViewText 
                            text={containerStructure.description}
                            styles={descriptionStyles}
                        />
                    }
                    {
                        containerStructure.elements.map((nameElem) => 
                            <IndexElements 
                                key={nameElem}
                                name={nameElem}
                                configForm={configForm}
                                storeForm={storeForm}
                            />
                        )
                    }
                </ScrollView>
            );
        }
        else
        {
            return (
                <View style={containerStyles}>
                    {containerStructure.title && 
                        <ViewText 
                            text={containerStructure.title}
                            styles={titleStyles}
                        />
                    }
                    {containerStructure.description && 
                        <ViewText 
                            text={containerStructure.description}
                            styles={descriptionStyles}
                        />
                    }
                    {
                        containerStructure.elements.map((nameElem) => 
                            <IndexElements 
                                key={nameElem}
                                name={nameElem}
                                configForm={configForm}
                                storeForm={storeForm}
                            />
                        )
                    }
                </View>
            );
        }
    }
    else if(containerStructure.containers)
    {
        if(containerStructure.viewType && containerStructure.viewType === 'ScrollView')
        {
            return (
                <ScrollView style={containerStyles}>
                    {
                        Object.keys(containerStructure.containers).map((curName, key) => 
                            <SecondContainer 
                                key={key} 
                                containerStructure={containerStructure.containers[curName]}
                                containerName={curName}
                                configForm={configForm}
                                storeForm={storeForm}
                            />
                        )
                    }
                </ScrollView>
            );
        }
        else
        {
            return (
                <View style={containerStyles}>
                    {
                        Object.keys(containerStructure.containers).map((curName, key) => 
                            <SecondContainer 
                                key={key} 
                                containerStructure={containerStructure.containers[curName]}
                                containerName={curName}
                                configForm={configForm}
                                storeForm={storeForm}
                            />
                        )
                    }
                </View>
            );
        }
    }
    else 
    {
        return null;
    }
}
export default FirstContainer;