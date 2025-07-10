import BottomSheet from '@gorhom/bottom-sheet'
import { ChevronsRight } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Spinner, Text, View, XStack, YStack } from 'tamagui'

import { ISheet } from '@/components/ui/Sheet'
import { Model } from '@/types/assistant'
import { getModelUniqId } from '@/utils/model'

import { ModelSelect } from './ModelSelect'

interface ApiCheckSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>
  isOpen: boolean
  onClose: () => void
  selectedModel: Model | undefined
  onModelChange: (value: string) => void
  selectOptions: {
    label: string
    title: string
    options: {
      label: string
      value: string
      model: Model
    }[]
  }[]
  apiKey: string
  onStartModelCheck: () => void
  isCheckingApi: boolean
}

export function ApiCheckSheet({
  bottomSheetRef,
  isOpen,
  onClose,
  selectedModel,
  onModelChange,
  selectOptions,
  apiKey,
  onStartModelCheck,
  isCheckingApi
}: ApiCheckSheetProps) {
  const { t } = useTranslation()
  const sheetSnapPoints = ['40%']

  return (
    <ISheet bottomSheetRef={bottomSheetRef} isOpen={isOpen} onClose={onClose} snapPoints={sheetSnapPoints}>
      <YStack alignItems="center" paddingTop={10} paddingBottom={30} paddingHorizontal={20} gap={10}>
        <XStack width="100%" alignItems="center" justifyContent="center">
          <Text fontSize={24}>{t('settings.provider.api_check.title')}</Text>
        </XStack>

        <YStack width="100%" gap={5}>
          <Text>{t('settings.provider.api_check.tooltip')}</Text>
          <ModelSelect
            value={selectedModel ? getModelUniqId(selectedModel) : undefined}
            onValueChange={onModelChange}
            selectOptions={selectOptions}
            placeholder={t('settings.models.empty')}
          />
        </YStack>

        <XStack width="100%" alignItems="center" justifyContent="center">
          <Button
            height={60}
            width={224}
            borderRadius={70}
            backgroundColor="$color1"
            disabled={!selectedModel || !apiKey}
            onPress={onStartModelCheck}>
            {isCheckingApi ? (
              <Spinner size="small" />
            ) : (
              <View>
                <XStack width="100%" alignItems="center" justifyContent="space-between">
                  <Text fontSize={18} fontWeight="bold">
                    {t('button.start_check_model')}
                  </Text>
                  <ChevronsRight />
                </XStack>
              </View>
            )}
          </Button>
        </XStack>
      </YStack>
    </ISheet>
  )
}
