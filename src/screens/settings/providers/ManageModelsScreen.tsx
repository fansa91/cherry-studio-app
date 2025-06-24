import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { Minus, Plus } from '@tamagui/lucide-icons'
import { debounce, groupBy, isEmpty, uniqBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Accordion, Button, ScrollView, Tabs, Text, useTheme, YStack } from 'tamagui'

import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { ModelGroup } from '@/components/settings/providers/ModelGroup'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { SearchInput } from '@/components/ui/SearchInput'
import { groupQwenModels, isFreeModel } from '@/config/models'
import { isEmbeddingModel } from '@/config/models/embedding'
import { isFunctionCallingModel } from '@/config/models/functionCalling'
import { isReasoningModel } from '@/config/models/reasoning'
import { isRerankModel } from '@/config/models/rerank'
import { isVisionModel } from '@/config/models/vision'
import { isWebSearchModel } from '@/config/models/webSearch'
import { useProvider } from '@/hooks/useProviders'
import { fetchModels } from '@/services/ApiService'
import { Model } from '@/types/assistant'
import { RootStackParamList } from '@/types/naviagate'
import { runAsyncFunction } from '@/utils'
import { getDefaultGroupName } from '@/utils/naming'

type ProviderSettingsRouteProp = RouteProp<RootStackParamList, 'ManageModelsScreen'>

// Check if the model exists in the provider's model list
const getIsModelInProvider = (providerModels: Model[]) => {
  const providerModelIds = new Set(providerModels.map(m => m.id))
  return (modelId: string): boolean => providerModelIds.has(modelId)
}

const getIsAllInProvider = (isModelInProviderFunc: (modelId: string) => boolean) => {
  return (models: Model[]): boolean => models.every(model => isModelInProviderFunc(model.id))
}

export default function ManageModelsScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute<ProviderSettingsRouteProp>()

  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')
  const [listModels, setListModels] = useState<Model[]>([])
  const [actualFilterType, setActualFilterType] = useState<string>('all')

  const { providerId } = route.params
  const { provider, models: providerModels } = useProvider(providerId)

  const isModelInCurrentProvider = getIsModelInProvider(providerModels)
  const isAllModelsInCurrentProvider = getIsAllInProvider(isModelInCurrentProvider)

  // Debounce search text
  const debouncedSetSearchText = debounce(setDebouncedSearchText, 300)

  useEffect(() => {
    debouncedSetSearchText(searchText)

    return () => {
      debouncedSetSearchText.cancel()
    }
  }, [searchText, debouncedSetSearchText])

  const allModels = uniqBy(listModels, 'id')

  const list = allModels.filter(model => {
    if (
      debouncedSearchText &&
      !model.id.toLocaleLowerCase().includes(debouncedSearchText.toLocaleLowerCase()) &&
      !model.name?.toLocaleLowerCase().includes(debouncedSearchText.toLocaleLowerCase())
    ) {
      return false
    }

    switch (actualFilterType) {
      case 'reasoning':
        return isReasoningModel(model)
      case 'vision':
        return isVisionModel(model)
      case 'websearch':
        return isWebSearchModel(model)
      case 'free':
        return isFreeModel(model)
      case 'embedding':
        return isEmbeddingModel(model)
      case 'function_calling':
        return isFunctionCallingModel(model)
      case 'rerank':
        return isRerankModel(model)
      default:
        return true
    }
  })

  const modelGroups =
    provider.id === 'dashscope'
      ? {
          ...groupBy(
            list.filter(model => !model.id.startsWith('qwen')),
            'group'
          ),
          ...groupQwenModels(list.filter(model => model.id.startsWith('qwen')))
        }
      : groupBy(list, 'group')

  const sortedModelGroups = Object.entries(modelGroups).sort(([a], [b]) => a.localeCompare(b))

  const tabConfigs = [
    { value: 'all', label: t('models.type.all') },
    { value: 'reasoning', label: t('models.type.reasoning') },
    { value: 'vision', label: t('models.type.vision') },
    { value: 'websearch', label: t('models.type.websearch') },
    { value: 'free', label: t('models.type.free') },
    { value: 'embedding', label: t('models.type.embedding') },
    { value: 'rerank', label: t('models.type.rerank') },
    { value: 'function_calling', label: t('models.type.function_calling') }
  ]

  // 添加通用 tab 样式函数
  const getTabStyle = (tabValue: string) => ({
    height: '100%',
    backgroundColor: actualFilterType === tabValue ? '$background' : 'transparent',
    borderRadius: 15
  })

  const onAddModel = (model: Model) => {
    console.log('[ManageModelsPage] onAddModel', model)
    // addModelToProvider(model.id) // Example: Call mutation from useProvider
  }

  const onRemoveModel = (model: Model) => {
    console.log('[ManageModelsPage] onRemoveModel', model)
    // removeModelFromProvider(model.id) // Example: Call mutation
  }

  const onAddAllModels = (modelsToAdd: Model[]) => {
    console.log('[ManageModelsPage] onAddAllModels', modelsToAdd)
    // addModelsToProvider(modelsToAdd.map(m => m.id)) // Example: Call mutation
    // modelsToAdd.forEach(model => {
    //   onAddModel(model)
    // })
  }

  const onRemoveAllModels = (modelsToRemove: Model[]) => {
    console.log('[ManageModelsPage] onRemoveAllModels', modelsToRemove)
    // removeModelsFromProvider(modelsToRemove.map(m => m.id)) // Example: Call mutation
    // modelsToRemove.forEach(model => {
    //   onRemoveModel(model)
    // })
  }

  useEffect(() => {
    runAsyncFunction(async () => {
      try {
        const models = await fetchModels(provider)
        setListModels(
          models
            .map(model => ({
              id: model?.id || model?.name,
              // @ts-ignore name
              name: model?.display_name || model?.displayName || model?.name || model?.id,
              provider: provider.id,
              group: getDefaultGroupName(model?.id || model?.name, provider.id),
              description: model?.description || '',
              owned_by: model?.owned_by || ''
            }))
            .filter(model => !isEmpty(model.name))
        )
      } catch (error) {
        console.error('Failed to fetch models', error)
      }
    })
  }, [provider])

  const renderModelGroupItem = ({ item: [groupName, currentModels], index }: ListRenderItemInfo<[string, Model[]]>) => (
    <ModelGroup
      groupName={groupName}
      models={currentModels}
      index={index}
      showModelCount={true}
      renderGroupButton={groupButtonModels => (
        <Button
          size={20}
          chromeless
          icon={
            isAllModelsInCurrentProvider(groupButtonModels) ? (
              <Minus size={14} borderRadius={99} backgroundColor="$backgroundRed" color="$foregroundRed" />
            ) : (
              <Plus size={14} borderRadius={99} backgroundColor="$backgroundGreen" color="$foregroundGreen" />
            )
          }
          onPress={
            isAllModelsInCurrentProvider(groupButtonModels)
              ? () => onRemoveAllModels(groupButtonModels)
              : () => onAddAllModels(groupButtonModels)
          }
        />
      )}
      renderModelButton={model => (
        <Button
          size={14}
          chromeless
          icon={
            isModelInCurrentProvider(model.id) ? (
              <Minus size={14} borderRadius={99} backgroundColor="$backgroundRed" color="$foregroundRed" />
            ) : (
              <Plus size={14} borderRadius={99} backgroundColor="$backgroundGreen" color="$foregroundGreen" />
            )
          }
          onPress={isModelInCurrentProvider(model.id) ? () => onRemoveModel(model) : () => onAddModel(model)}
        />
      )}
    />
  )

  return (
    <SafeAreaContainer
      style={{
        flex: 1,
        backgroundColor: theme.background.val
      }}>
      <HeaderBar title={provider.name} onBackPress={() => navigation.goBack()} />
      <SettingContainer>
        {/* Filter Tabs */}
        <Tabs
          defaultValue="all"
          value={actualFilterType}
          onValueChange={setActualFilterType}
          orientation="horizontal"
          flexDirection="column"
          height={34}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Tabs.List aria-label="Model filter tabs" gap="10" flexDirection="row">
              {tabConfigs.map(({ value, label }) => (
                <Tabs.Tab key={value} value={value} {...getTabStyle(value)}>
                  <Text>{label}</Text>
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </ScrollView>
        </Tabs>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <YStack flex={1} gap={24}>
            {/* Search Card */}
            <SearchInput placeholder={t('settings.models.search')} value={searchText} onChangeText={setSearchText} />

            {/* Model List Card with Accordion */}
            <YStack flex={1}>
              {sortedModelGroups.length > 0 ? (
                <Accordion overflow="hidden" type="multiple">
                  <FlashList
                    data={sortedModelGroups}
                    renderItem={renderModelGroupItem}
                    keyExtractor={([groupName]) => groupName}
                    estimatedItemSize={60} // 您可能需要根据 ModelGroup 折叠时的高度进行调整
                  />
                </Accordion>
              ) : (
                <Text textAlign="center" color="$gray10" paddingVertical={24}>
                  {searchText ? t('settings.models.no_results') : t('models.no_models')}
                </Text>
              )}
            </YStack>
          </YStack>
        </ScrollView>
      </SettingContainer>
    </SafeAreaContainer>
  )
}
