import React, { useRef } from 'react'
import {  Animated } from 'react-native'

export const useFade = () => {

    const opacity = useRef(new Animated.Value(0)).current;

    const fadeIn = (callBack?: Function) => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }
        ).start( () => callBack ? callBack() : null);
    }

    const fadeOut = () => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }
        ).start();
    }
    
    return {
        opacity,
        fadeIn,
        fadeOut
    }
}
