import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import currencyFormatter from 'currency-formatter'
import { CastItem } from './CastItem';

interface Props {
    movieFull: MovieFull;
    cast: Cast[]
}

export const MovieDetails = ({movieFull, cast}: Props) => {
    return (
        <>
           <View style={{marginHorizontal: 20}}>
                {
                  movieFull.vote_average
                    ? <View style={{flexDirection: 'row'}}>
                            <Icon name="star-outline" color="grey" size={16}/> 
                            <Text> {movieFull.vote_average}</Text>
                        </View>
                    : <Text>Puntuación No Disponible.</Text>

                }
                
                <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>Genero</Text>
                <Text style={{marginLeft: 5}}>
                    {movieFull.genres.map(gen => gen.name).join(', ')}
                </Text>

               <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>Historia</Text>
               <Text style={{textAlign: 'justify', fontSize: 15}}>{movieFull.overview}</Text>

               <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>Presupuesto</Text>
               <Text style={{textAlign: 'justify', fontSize: 15}}>
                   {movieFull.budget 
                        ? currencyFormatter.format(movieFull.budget, { code: 'USD' })
                        : <Text>Información No disponible.</Text>
                   }
                </Text>
           </View>

           <View style={{marginTop: 10, marginBottom: 50}}>
                <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20}}>Actores</Text>
                <FlatList
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <CastItem actor={item}/>}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style= {{marginTop: 10,  height:120}}
                />
            </View>
        </>
    )
}
