import React from 'react';
import { View, Text } from 'react-native';

const ViewText = ({ text, styles }) => (
    
    <View style={styles.view || {}}>
        <Text style={styles.text || {}}>
            {text}
        </Text>
    </View>
);
export default ViewText;