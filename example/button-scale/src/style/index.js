import { StyleSheet } from "react-native"


const colors = {
	primary: "#1fcc79",
	secondary: "#3e5481",
	white: "#ffffff",
	black: "#000000",
	text: "#3e5481"
}


export const button = StyleSheet.create({
	border: {
		borderColor: colors.black,
		borderStyle: "solid",
		borderWidth: 1
	},
	button: {
		borderRadius: 40,
		justifyContent: "center",
		marginTop: 12
	},
	large: {
		height: 56,
		width: 327
	},
	primary: {
		backgroundColor: colors.primary
	},
	secondary: {
		backgroundColor: colors.secondary,
	},
	small: {
		height: 56,
		width: 156
	}
})

export const text = StyleSheet.create({
	h1: {
		color: colors.text,
		fontSize: 24,
		fontStyle: "normal",
		fontWeight: "normal",
		letterSpacing: 0.75,
		lineHeight: 28,
		paddingVertical: 20
	},
	button: {
		color: colors.text,
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		letterSpacing: 0.75,
		lineHeight: 28
	},
	primary: {
		color: colors.white,
		textAlign: "center"
	},
	secondary: {
		color: colors.primary,
		textAlign: "center"
	}
})
