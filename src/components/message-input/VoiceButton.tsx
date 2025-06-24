import React from 'react'
import { Button } from 'tamagui'

import { VoiceIcon } from '../icons/VoiceIcon'

export const VoiceButton: React.FC = () => {
  return <Button chromeless size={24} icon={<VoiceIcon size={24} />} />
}
