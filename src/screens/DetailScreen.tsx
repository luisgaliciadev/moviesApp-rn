import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Image, Text, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams, Navigation } from '../navigation/Navigation';

import { useMovieDetails } from '../hooks/useMovieDetals';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/dist/Ionicons';



const screenHeight = Dimensions.get('screen').height

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const DetailScreen = ({route, navigation}: Props) => {
    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const { isLoading, cast, movieFull} = useMovieDetails(movie.id);


    return (
        <ScrollView>
           
            <View style={styles.imgContainer}>
                <View style={styles.imgBorder}>
                    <Image
                        source={{uri}}
                        style={{...styles.posterImage}}
                    />
                </View>
            </View>

            <View style={styles.marginContainer}>
                <Text style={styles.subTitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>

            {isLoading
                ? <ActivityIndicator color="grey" size={30} style={{marginTop: 20}}></ActivityIndicator>
                : <MovieDetails movieFull={movieFull!} cast={cast!}/>
            }

            <View style={styles.backButton}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                >
                    <Icon color="#cccc" name="arrow-back-outline" size={40}></Icon>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imgBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    },
    posterImage: {
        flex: 1,
    },
    imgContainer: {
        width: '100%',
        height: screenHeight * 0.80,
        // overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 7,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 10
    },
    subTitle: {
        fontSize: 16,
        color: 'grey'
    },
    title: {
        fontSize: 20,
        color: 'grey',
        fontWeight: 'bold'
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 5,
        left: 10
        
    }

})
