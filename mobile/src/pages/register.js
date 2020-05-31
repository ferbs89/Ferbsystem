import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from '../styles/global';
import logoImg from '../assets/logo.png';

export default function RegisterScreen({ navigation }) {
	return (
		<View style={styles.loginContainer}>
			<View style={styles.loginContent}>
				<View style={styles.logoContainer}>
					<Image source={logoImg} />
				</View>

				<Text style={styles.loginTitle}>Criar uma conta</Text>
				<Text style={styles.loginDescription}>Faça seu cadastro para entrar na plataforma.</Text>

				<TextInput
					style={styles.textInput}
					underlineColorAndroid="rgba(0, 0, 0, 0)"
					placeholder="Nome"
				/>

				<TextInput
					style={styles.textInput}
					autoCapitalize="none"
					underlineColorAndroid="rgba(0, 0, 0, 0)"
					placeholder="E-mail"
					keyboardType="email-address"
				/>

				<TextInput
					style={styles.textInput}
					autoCapitalize="none"
					underlineColorAndroid="rgba(0, 0, 0, 0)"
					placeholder="Senha"
					secureTextEntry={true}
				/>

				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Cadastrar</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.buttonOutline} onPress={() => { navigation.navigate('LoginScreen') }}>
					<Text style={styles.buttonOutlineText}>Voltar para o login</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}