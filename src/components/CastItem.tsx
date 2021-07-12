import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native';
import { Cast } from '../interfaces/creditsInterface'

interface Props {
    actor: Cast
}

export const CastItem = ({actor}: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`

    return (
        <View style={styles.container}>
            {
                actor.profile_path && <Image source={{uri}} style={{width: 60, height: 90, borderRadius: 10}}/>
            }
            <View style={styles.actorInfo}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{actor.name}</Text>
                <Text style={{fontSize: 16, opacity: 0.7}}>Personaje: {actor.character}</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        height:90,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        marginHorizontal: 20,
        paddingRight: 10
    },
    actorInfo: {
        marginLeft: 10,
        marginTop: 5
    }
})
