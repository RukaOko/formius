import React, { Component } from 'react';
import { Platform, Image, TouchableOpacity, Text, View } from 'react-native';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import ViewText from '../custom/ViewText';
import ElemValidation from '../validation/ElemValidation';

export default class Img extends Component {

    state = {
        name: '', 
        value: '', 
        error: false, 
        element: {},
        stylesElem: {},
        stylesError: {},
        snapshot: ''
    }
    

    pickImage = async () => 
    {
        var { element, name, value, error } = this.state,
            widthRatio = element.widthRatio ? parseInt(element.widthRatio) : 480;
            

        this.getPermissionAsync();
        var result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [3, 3]
        });

        if (result.cancelled) 
        {
            return false;
        }
        else
        {
           
            const manipResult = await ImageManipulator.manipulateAsync(
                result.uri,
                [{ resize: { width: widthRatio * 1 } }],
                { format: ImageManipulator.SaveFormat.PNG }
            );
            if(manipResult && manipResult.uri)
            {
                value = manipResult.uri;
                if(element.validation)
                {
                    error = ElemValidation(value, element.validation);
                }
                this.setState({ value, error });
                this.props.storeForm( name, value, error );
            }
            else
            {
                return false;
            }
        
        }
    }

    getPermissionAsync = async () => {
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Для работы с картинками необходим доступ к камере');
            }
        }
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
        let buttonTitle = value === '' ? element.button.titleStart : element.button.titleChange,
            uri = value;

        return (
            <>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <TouchableOpacity 
                        style={stylesElem.touchableOpacity}
                        onPress={this.pickImage}
                    >
                        <Text style={stylesElem.buttonTitle}>{buttonTitle}</Text>
                    </TouchableOpacity>
                    {value !== '' && 
                        <Image 
                            style={stylesElem.img}
                            source={{ uri }}
                        />
                    }
                </View>
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
