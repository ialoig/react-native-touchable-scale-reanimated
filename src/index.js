import PropTypes from "prop-types"
import React from "react"
import { Platform } from "react-native"
import { TapGestureHandler } from "react-native-gesture-handler"
import Animated, { 
	Easing,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming } from "react-native-reanimated"

const DEFAULT_DURATION = 150
const DEFAULT_SCALE = 0.95


export const TouchableScale = ({ style, children, onPress, scaleValue, durationValue, ...props }) => {
    
	//define scale value to set; change every time an event is catch
	const scale = useSharedValue(1)
	//define if press event has been released 
	const releasePress = useSharedValue(false)
	//duration time defined by props or by default value
	const activeDuration = durationValue !== undefined ? durationValue : DEFAULT_DURATION
	//active scale value defined by props or by default value
	const activeScale = scaleValue !== undefined ? scaleValue : DEFAULT_SCALE

	//value when component is pressed and scale decrease
	const scaleIn = useDerivedValue( () => {
		const value = withTiming(activeScale, { 
			duration: activeDuration,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
			useNativeDriver: true,
		})
		return value
	})

	//value when component is on starting state
	const scaleOut = useDerivedValue( () => {
		const value = withTiming(1, { 
			duration: activeDuration,
			useNativeDriver: true,
		})
		return value
	})


	const eventHandler = useAnimatedGestureHandler({
		onStart: () => {
			releasePress.value = true
			scale.value = scaleIn.value
		},
		onEnd: () => {
			releasePress.value = false
			scale.value = scaleOut.value
			if (onPress)
				runOnJS(onPress)?.()
		},
		onFinish: () => {
			releasePress.value = false
			scale.value = scaleOut.value
		},
	})


	const animatedStyle = useAnimatedStyle( () => {
		return {
			transform: [{ scale: onPress === undefined ? 1 : scale.value }], //disabled scale when onPress function is not defined
		}
	})


	if (Platform.OS === "android") {
		return (
			<TapGestureHandler 
				onGestureEvent={eventHandler}
				// Otherwise animation stops after short time on android
				maxDurationMs={10000000000}
				//Sets additional distance outside of element in which a press can be detected.
				hitSlop={5}
				//Maximum time, expressed in milliseconds, that can pass before the next tap — if many taps are required.
				maxDelayMs={0}
			>
				<Animated.View style={[style, animatedStyle]} pointerEvents="box-only">
					{children}
				</Animated.View>
			</TapGestureHandler>
		)
	}
	else if (Platform.OS === "ios") {
		return (
			<TapGestureHandler 
				onGestureEvent={eventHandler}
				//Maximum distance, expressed in points, that defines how far the finger is allowed to travel along the X axis during a tap gesture.
				maxDeltaX={40} 
				//Maximum distance, expressed in points, that defines how far the finger is allowed to travel along the Y axis during a tap gesture
				maxDeltaY={40}
			>
				<Animated.View style={[style, animatedStyle]} pointerEvents="box-only" {...props}>
					{children}
				</Animated.View>
			</TapGestureHandler>
		)
	}
}


TouchableScale.propTypes = {
	style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	onPress: PropTypes.func,
	scaleValue: PropTypes.number,
	durationValue: PropTypes.number,
}

TouchableScale.defaultProps = {
	scaleValue: DEFAULT_SCALE,
	durationValue: DEFAULT_DURATION
}
