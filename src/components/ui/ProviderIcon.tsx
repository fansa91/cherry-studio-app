import React from 'react'
import { Image, useThemeName } from 'tamagui'

import { Provider } from '@/types/assistant'
import { getProviderIcon } from '@/utils/icon'

interface ProviderIconProps {
  provider: Provider
}

export const ProviderIcon: React.FC<ProviderIconProps> = ({ provider }) => {
  const theme = useThemeName()
  const isDark = theme === 'dark'

  const iconSource = getProviderIcon(provider.id, isDark)

  return <Image width={20} height={20} source={iconSource} />
}
