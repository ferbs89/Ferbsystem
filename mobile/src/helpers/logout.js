import AsyncStorage from '@react-native-community/async-storage';

import NavigationService from '../navigation/NavigationService';

export async function Logout() {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');

    NavigationService.navigate('LoginScreen');
}