import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Dimensions, FlatList, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';

import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackgroud } from '../components/GradientBackgroud';
import { getImageColors } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';

const { width: windowWidth  } =  Dimensions.get('window');

export const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upComing, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const {setMainColors} = useContext(GradientContext);
    const getPosterColors = async (index: number) => {
        const movie = nowPlaying[index]
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const [primary, secondary] = await getImageColors(uri);
        setMainColors({primary, secondary});
        console.log(primary, secondary);
    }
    
    useEffect(() => {
        if (nowPlaying.length > 0) {
            getPosterColors(0);
        }
    }, [nowPlaying])


    if (isLoading) {
        return (
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <ActivityIndicator color="red" size={100}></ActivityIndicator>
        </View>
        )
    }

    return (
        <GradientBackgroud>
            <ScrollView>
                <View style={{ marginTop: top + 5 }}>

                    <View style={{height:440}}>
                        <Carousel
                            data={nowPlaying}
                            renderItem={ ({item}: any) => <MoviePoster movie={item}/>}
                            sliderWidth={windowWidth}
                            itemWidth={300}
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={ index => getPosterColors(index) }
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
        </GradientBackgroud>
    )
}
