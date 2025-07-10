import { useWindowDimensions } from 'react-native'

export enum Size {
  XS = 320,
  SM = 480,
  MD = 768,
  LG = 1024,
  XL = 1280,
  XXL = 1536
}

export const useWidth = (size: Size) => {
  if (typeof window === 'undefined') {
    return true
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { width } = useWindowDimensions()

  return width >= size
}

export const useSize = () => {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0
    }
  }

  const { width, height } = useWindowDimensions()

  return {
    width,
    height
  }
}
