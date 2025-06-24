import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { Image, View } from 'tamagui'

import { ImageMessageBlock } from '@/types/message'

interface Props {
  block: ImageMessageBlock
}

const ImageBlock: React.FC<Props> = ({ block }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ height: 168, width: 168, uri: block.file?.path }} />
    </View>
  )
}

export default memo(ImageBlock)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    backgroundColor: '#0553'
  }
})
