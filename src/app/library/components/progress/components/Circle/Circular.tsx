import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    lessThan,
    multiply,
    useCode,
    set,
} from "react-native-reanimated";

import { transformOrigin, useValues, clamp, timing } from "react-native-redash";
import { HalfCircle } from "./HalfCircle";
const { PI } = Math;
interface CircularProps {
    progress: number;

    bg: string;

    fg: string;

    radius: number;
}

const styles = StyleSheet.create({
    circleTop:{
        zIndex: 1
    },
    circleBottom:{
        transform: [{ rotate: "180deg" }]
    },
})


export const Circular = ({ progress, bg, fg, radius }: CircularProps) => {
    const [progressAnimated] = useValues([progress], [])
    const actualProgress = clamp(progressAnimated, 0, 100)
    const thetaProgress = interpolate(actualProgress, {
        inputRange: [0, 100],
        outputRange: [0, 1]
    })
    const theta = multiply(thetaProgress, 2 * PI);
    const opacity = lessThan(theta, PI);
    const rotate = interpolate(theta, {
        inputRange: [PI, 2 * PI],
        outputRange: [0, PI],
        extrapolate: Extrapolate.CLAMP,
    });
    useCode(() => [set(progressAnimated, timing({ from: progressAnimated, to: progress }))], [progress])
    return (
        <>
            <View style={[styles.circleTop]}>
                <HalfCircle radius={radius} color={fg} />
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        transform: transformOrigin(
                            { x: 0, y: radius / 2 },
                            { rotate: theta }
                        ),
                        opacity,
                    }}
                >
                    <HalfCircle radius={radius} color={bg} />
                </Animated.View>
            </View>
            <View style={[styles.circleBottom]}>
                <HalfCircle radius={radius} color={fg} />
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        transform: transformOrigin({ x: 0, y: radius / 2 }, { rotate }),
                    }}
                >
                    <HalfCircle radius={radius} color={bg} />
                </Animated.View>
            </View>
        </>
    );
};