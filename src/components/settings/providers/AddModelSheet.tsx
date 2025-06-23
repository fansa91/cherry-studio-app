import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet' // For type if needed
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, XStack, YStack } from 'tamagui'

import { ISheet } from '@/components/ui/Sheet'

interface AddModelSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>
  isOpen: boolean
  onClose: () => void
  // Add any other props needed, e.g., for provider ID if adding model to a specific provider
  // onAddModel: (modelData: any) => void; // Callback function when model is added
}

export function AddModelSheet({
  bottomSheetRef,
  isOpen,
  onClose
  // onAddModel,
}: AddModelSheetProps) {
  const { t } = useTranslation()
  const snapPoints = ['55%']
  const [modelId, setModelId] = useState('')
  const [modelName, setModelName] = useState('')
  const [modelGroup, setModelGroup] = useState('')

  const handleAddModel = () => {
    if (!modelId.trim()) {
      // Handle error (e.g., show a toast message)
      console.warn('Model ID is required.')
      return
    }

    // Construct model data object
    const newModelData = {
      id: modelId,
      name: modelName,
      group: modelGroup
      // Add other model properties here
    }
    // onAddModel(newModelData);
    console.log('Adding model:', newModelData) // Placeholder for actual add logic
    onClose() // Close the sheet after adding
  }

  return (
    <ISheet bottomSheetRef={bottomSheetRef} isOpen={isOpen} onClose={onClose} snapPoints={snapPoints}>
      <YStack alignItems="center" paddingTop={10} paddingBottom={30} paddingHorizontal={20} gap={10}>
        <XStack width="100%" alignItems="center" justifyContent="center">
          <Text fontSize={24}>{t('settings.models.add.model')}</Text>
        </XStack>
        <YStack width="100%" gap={24} justifyContent="center" alignItems="center">
          <YStack width="100%" gap={8}>
            <XStack gap={8}>
              <Text color="red">*</Text>
              <Text>{t('settings.models.add.model.id')}</Text>
            </XStack>
            <BottomSheetTextInput
              placeholder={t('settings.models.add.model.id.placeholder')}
              value={modelId}
              onChangeText={setModelId}
            />
          </YStack>

          <YStack width="100%" gap={8}>
            <Text>{t('settings.models.add.model.name')}</Text>
            <BottomSheetTextInput
              placeholder={t('settings.models.add.model.name.placeholder')}
              value={modelName}
              onChangeText={setModelName}
            />
          </YStack>

          <YStack width="100%" gap={8}>
            <Text>{t('settings.models.add.model.group')}</Text>
            <BottomSheetTextInput
              placeholder={t('settings.models.add.model.group.placeholder')}
              value={modelGroup}
              onChangeText={setModelGroup}
            />
          </YStack>

          <Button
            height={44}
            width={216}
            borderRadius={15}
            paddingVertical={10}
            paddingHorizontal={15}
            fontSize={16}
            onPress={handleAddModel}
            disabled={!modelId.trim()}>
            {t('settings.models.add.model')}
          </Button>
        </YStack>
      </YStack>
    </ISheet>
  )
}
