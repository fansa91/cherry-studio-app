import React from 'react'
import { Switch } from 'tamagui'

interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  size?: string
  disabled?: boolean
}

export const CustomSwitch = ({
  checked,
  defaultChecked,
  onCheckedChange,
  size = '$2',
  disabled = false
}: SwitchProps) => {
  const isChecked = checked ?? defaultChecked ?? false

  return (
    <Switch
      size={size}
      checked={checked}
      defaultChecked={defaultChecked}
      backgroundColor={isChecked ? '#3CD45A' : '#666'}
      borderColor="$colorTransparent"
      onCheckedChange={onCheckedChange}
      disabled={disabled}>
      <Switch.Thumb animation="quicker" backgroundColor="white" />
    </Switch>
  )
}
