import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Movie } from '../interfaces/movieInterface';


interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}

export const MoviePoster = ( { movie, height = 430, width=300 }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            onPress={ () => navigation.navigate('DetailScreen', movie)}
            activeOpacity={0.6}
            style={{
                width,
                height,
                marginHorizontal:2,
                paddingBottom: 20,
                paddingHorizontal: 6
            }}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{uri}}
                    style={styles.image}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 20
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    } 
})
