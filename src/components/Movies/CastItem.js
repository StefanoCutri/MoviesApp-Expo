import { View, Text, Image } from 'react-native'
import React from 'react'

const CastItem = ({item}) => {
  return (
    <View style={{paddingHorizontal: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
         <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
          }}
          style={{ width: 80, height: 80, borderRadius: 100, marginBottom: 5 }}
        />
      <Text style={{color: "#fff"}}>{item.name}</Text>
    </View>
  )
}

export default CastItem