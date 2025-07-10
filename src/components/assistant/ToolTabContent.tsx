import React from 'react'
import { Text, YStack } from 'tamagui'

import { Assistant } from '@/types/assistant'

interface ToolTabContentProps {
  assistant: Assistant
  updateAssistant: (assistant: Assistant) => void
}

export function ToolTabContent({ assistant }: ToolTabContentProps) {
  return (
    <YStack flex={1} padding="$4">
      <Text fontSize="$4" fontWeight="$6" marginBottom="$2">
        Knowledge Base
      </Text>
      <Text color="$gray10">Upload and manage tool documents for your assistant.</Text>
    </YStack>
  )
}
