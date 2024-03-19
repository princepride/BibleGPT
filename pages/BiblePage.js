import { View, Text } from 'react-native'
import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

const BiblePage = () => {
  const {bibleIndex, setBibleIndex} = useStateContext();

  return (
    <View>
      <Text>BiblePage</Text>
      <Text>{bibleIndex.book}</Text>
    </View>
  )
}

export default BiblePage