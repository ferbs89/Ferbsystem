import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import api from '../services/node-api';
import { login } from '../services/auth';

import styles from '../styles/global';
import logoImg from '../assets/logo.png';

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState('ferbs89@gmail.com');
	const [password, setPassword] = useState('fer');
	const [loading, setLoading] = useState(false);

	async function handleLogin() {
		if (!email || !password) {
			Alert.alert(null, 'Preencha corretamente os campos de e-mail e senha.');
			return;
		}

		setLoading(true);

		await api.post('/login', {
			email,
			password

		}).then(response => {
			const { token } = response.data;
			login(token);

		}).catch(error => {
			setLoading(false);
		});
	}

	return (
		<View style={styles.loginContainer}>
			<View style={styles.loginContent}>
				<View style={styles.logoContainer}>
					<Image source={logoImg} />
				</View>

				{loading ? (
					<ActivityIndicator color="#17496E" size="large" />
				) : (
					<>
						<TextInput
							style={styles.textInput}
							autoCapitalize="none"
							underlineColorAndroid="rgba(0, 0, 0, 0)"
							placeholder="E-mail"
							keyboardType="email-address"
							value={email}
							onChangeText={setEmail}
						/>

						<TextInput
							style={styles.textInput}
							autoCapitalize="none"
							underlineColorAndroid="rgba(0, 0, 0, 0)"
							placeholder="Senha"
							secureTextEntry={true}
							value={password}
							onChangeText={setPassword}
						/>

						<TouchableOpacity style={styles.button} onPress={handleLogin}>
							<Text style={styles.buttonText}>Entrar</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.buttonOutline} onPress={() => { navigation.navigate('RegisterScreen') }}>
							<Text style={styles.buttonOutlineText}>Não tenho cadastro</Text>
						</TouchableOpacity>
					</>
				)}
			</View>
		</View>
	);
}