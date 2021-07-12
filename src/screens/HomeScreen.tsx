import React from 'react'
import { ActivityIndicator, Dimensions, FlatList, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';

import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';

const { width: windowWidth  } =  Dimensions.get('window');

export const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upComing, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();

    if (isLoading) {
        return (
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <ActivityIndicator color="red" size={100}></ActivityIndicator>
        </View>
        )
    }

    return (
        <ScrollView>
            <View style={{ marginTop: top + 5 }}>

                <View style={{height:440}}>
                    <Carousel
                        data={nowPlaying}
                        renderItem={ ({item}: any) => <MoviePoster movie={item}/>}
                        sliderWidth={windowWidth}
                        itemWidth={300}
                        inactiveSlideOpacity={0.9}
                    />
                </View> 

                <HorizontalSlider
                    movies={popular}
                    title='Populares'
                ></HorizontalSlider>

                <HorizontalSlider       
                    movies={topRated}
                    title='Mejor Calificadas'
                ></HorizontalSlider>

                <HorizontalSlider       
                    movies={upComing}
                    title='Proximamente'
                ></HorizontalSlider>
            </View>   
        </ScrollView>
    )
}
