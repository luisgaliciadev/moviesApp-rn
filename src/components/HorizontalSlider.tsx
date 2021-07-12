import React from 'react'
import { FlatList, Text, View } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { MoviePoster } from './MoviePoster';

interface Props {
    title?: string;
    movies: Movie[]
}

export const HorizontalSlider = ({title, movies}: Props) => {
    return (

        <View style={{height: (title) ? 260 : 220}}>
            {
                title && <Text style={{fontSize: 20, fontWeight:'bold', marginLeft: 10, color: 'grey'}}>{title}</Text>
            }
            <FlatList
                data={movies}
                renderItem={ ({item}: any) => (
                    <MoviePoster movie={item} width={130} height={190}/>
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                style={{
                    marginTop: (title) ? 0 : 16
                }}
            />
        </View>
       
    )
}
