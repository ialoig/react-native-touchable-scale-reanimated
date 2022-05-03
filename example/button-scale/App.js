import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Button from "./src/components/Button"
import { text } from "./src/style"

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Text style={text.h1} >{"Press to show the scale effect"}</Text>
			<Button 
				title={"Button"}
				onPress={() => {console.log("pressed")}} 
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: color.background,
		flex: 1,
		justifyContent: "center",
	}
})



const color = StyleSheet.create({
	background: "#FFFFFF"
})