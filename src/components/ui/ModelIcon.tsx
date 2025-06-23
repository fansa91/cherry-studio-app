import React from 'react'
import { Image, useThemeName } from 'tamagui'

import { Model } from '@/types/assistant'
import { getModelOrProviderIcon } from '@/utils/icon'

interface ModelIconProps {
  model: Model
}

export const ModelIcon: React.FC<ModelIconProps> = ({ model }) => {
  const theme = useThemeName()
  const isDark = theme === 'dark'

  const iconSource = getModelOrProviderIcon(model.id, model.provider, isDark)

  return <Image width={20} height={20} source={iconSource} />
}
