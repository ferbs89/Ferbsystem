import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const DrawerButton = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={navigation.openDrawer} style={{ paddingLeft: 16 }}>
            <Icon name="menu" size={26} color="#17496E" />
        </TouchableOpacity>
    );
};

export default DrawerButton;