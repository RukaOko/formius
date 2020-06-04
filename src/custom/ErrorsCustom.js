import React from 'react';
import { View, Text } from 'react-native';

const Errors = ({ errors }) => (
    
    <View 
        style={{
            margin: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: 'red',
            backgroundColor: 'white'
        }}
    >
        {
            errors.map((text, key) => 
                <Text 
                    key={key
                    }
                    style={{
                        fontSize: 18,
                        color: 'red'
                    }}
                >
                    {text}
                </Text>
            )
        }
    </View>
);
export default Errors;