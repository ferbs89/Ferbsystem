import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	loginContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#17496E',
		padding: 16,
	},
	
	loginContent: {
		backgroundColor: '#FFF',
		borderRadius: 8,
		padding: 16,
	},
	
	logoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
	},
	
	loginTitle: {
		marginBottom: 8,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},

	loginDescription: {
		marginBottom: 16,
		textAlign: "center",
		color: '#737380',
	},
	
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},

	content: {
		padding: 16,
	},

	textInput: {
		alignSelf: 'stretch',
		paddingVertical: 0,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderColor: '#dcdce6',
		height: 48,
		borderRadius: 8,
		marginBottom: 16,
	},

	button: {
		height: 48,
		borderRadius: 8,
		backgroundColor: '#17496E',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
	},

	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
	},

	buttonOutline: {
		marginTop: 8,
		marginBottom: 8,
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
	},

	buttonOutlineText: {
		color: '#17496E',
		fontWeight: 'bold',
	},

	pageTitle: {
		padding: 16,
	},

	pageTitleText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
});