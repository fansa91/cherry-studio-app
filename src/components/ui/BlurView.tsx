// 用于兼容安卓

import { BlurView as BlurViewExpo } from 'expo-blur'
import React from 'react'
import { ComponentProps } from 'react'

export function BlurView(props: ComponentProps<typeof BlurViewExpo>) {
  return (
    <BlurViewExpo {...props} experimentalBlurMethod="dimezisBlurView">
      {props.children}
    </BlurViewExpo>
  )
}
