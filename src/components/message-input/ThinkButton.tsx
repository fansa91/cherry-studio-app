import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'tamagui'

import { MdiLightbulbOffOutline } from '../icons/MdiLightbulbIcon'

export const ThinkButton: React.FC = () => {
  const { t } = useTranslation()
  const thinkIcon = <MdiLightbulbOffOutline size={24} />

  return <Button chromeless size={24} icon={thinkIcon} />
}
