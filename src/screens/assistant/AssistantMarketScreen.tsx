import BottomSheet from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { BookmarkMinus } from '@tamagui/lucide-icons'
import { debounce } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, Tabs, Text } from 'tamagui'

import AllAssistantsTab from '@/components/assistant/market/AllAssistantsTab'
import AssistantItemSheet from '@/components/assistant/market/AssistantItemSheet'
import CategoryAssistantsTab from '@/components/assistant/market/CategoryAssistantsTab'
import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { SearchInput } from '@/components/ui/SearchInput'
import { getSystemAssistants } from '@/mock'
import { Assistant } from '@/types/assistant'
import { groupByCategories } from '@/utils/assistants'

import SafeAreaContainer from '../../components/ui/SafeAreaContainer'
interface TabConfig {
  value: string
  label: string
}

type FilterType = 'all' | string

export default function AssistantMarketScreen() {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const bottomSheetRef = useRef<BottomSheet>(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null)

  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false)
    setSelectedAssistant(null)
  }

  const handleAssistantItemPress = (assistant: Assistant) => {
    setSelectedAssistant(assistant)
    setIsBottomSheetOpen(true)
  }

  const [actualFilterType, setActualFilterType] = useState<FilterType>('all')
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')

  const systemAssistants = getSystemAssistants()

  const debouncedSetSearchText = debounce(setDebouncedSearchText, 300)

  useEffect(() => {
    debouncedSetSearchText(searchText)

    return () => {
      debouncedSetSearchText.cancel()
    }
  }, [searchText, debouncedSetSearchText])

  // Filter assistants by search text first
  const baseFilteredAssistants = (() => {
    if (!debouncedSearchText) {
      return systemAssistants
    }

    const lowerSearchText = debouncedSearchText.toLowerCase().trim()

    if (!lowerSearchText) {
      return systemAssistants
    }

    return systemAssistants.filter(
      assistant =>
        (assistant.name && assistant.name.toLowerCase().includes(lowerSearchText)) ||
        (assistant.id && assistant.id.toLowerCase().includes(lowerSearchText))
    )
  })()

  const assistantGroupsForDisplay = groupByCategories(baseFilteredAssistants)

  const assistantGroupsForTabs = groupByCategories(systemAssistants)

  // 过滤助手逻辑 for CategoryAssistantsTab
  const filterAssistants = (() => {
    if (actualFilterType === 'all') {
      return baseFilteredAssistants
    }

    return baseFilteredAssistants.filter(assistant => assistant.group && assistant.group.includes(actualFilterType))
  })()

  const tabConfigs = (() => {
    const groupKeys = Object.keys(assistantGroupsForTabs).sort()

    const allTab: TabConfig = {
      value: 'all',
      label: t('assistants.market.groups.all')
    }

    const dynamicTabs: TabConfig[] = groupKeys.map(groupKey => ({
      value: groupKey,
      label: t(`assistants.market.groups.${groupKey}`, groupKey.charAt(0).toUpperCase() + groupKey.slice(1))
    }))

    return [allTab, ...dynamicTabs]
  })()

  const getTabStyle = (tabValue: string) => ({
    height: '100%',
    backgroundColor: actualFilterType === tabValue ? '$background' : 'transparent',
    borderRadius: 15
  })

  const handleArrowClick = (groupKey: string) => {
    if (groupKey) {
      setActualFilterType(groupKey)
    }
  }

  const handleBackPress = () => {
    navigation.goBack()
  }

  const handleBookmarkPress = () => {
    console.log('Bookmark pressed')
  }

  const renderTabList = (
    <Tabs.List gap={10} flexDirection="row" height={34}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabConfigs.map(({ value, label }) => (
          <Tabs.Tab key={value} value={value} {...getTabStyle(value)}>
            <Text>{label}</Text>
          </Tabs.Tab>
        ))}
      </ScrollView>
    </Tabs.List>
  )

  const renderTabContents = (
    <>
      <Tabs.Content value={'all'} flex={1}>
        <AllAssistantsTab
          assistantGroups={assistantGroupsForDisplay}
          onArrowClick={handleArrowClick}
          setIsBottomSheetOpen={setIsBottomSheetOpen}
          onAssistantPress={handleAssistantItemPress}
        />
      </Tabs.Content>
      {tabConfigs
        .filter(({ value }) => value !== 'all')
        .map(({ value }) => (
          <Tabs.Content key={value} value={value} flex={1}>
            <CategoryAssistantsTab
              assistants={filterAssistants}
              setIsBottomSheetOpen={setIsBottomSheetOpen}
              onAssistantPress={handleAssistantItemPress}
            />
          </Tabs.Content>
        ))}
    </>
  )
  return (
    <SafeAreaContainer>
      <HeaderBar
        title={t('assistants.market.title')}
        onBackPress={handleBackPress}
        rightButton={{
          icon: <BookmarkMinus size={24} />,
          onPress: handleBookmarkPress
        }}
      />
      <SettingContainer>
        <SearchInput
          placeholder={t('assistants.market.search_placeholder')}
          value={searchText}
          onChangeText={setSearchText}
        />

        <Tabs
          gap={10}
          defaultValue={'all'}
          value={actualFilterType}
          onValueChange={setActualFilterType}
          orientation="horizontal"
          flexDirection="column"
          flex={1}>
          {renderTabList}
          {/* TODO: 有时可以滚动有时不可以 */}
          {renderTabContents}
        </Tabs>
      </SettingContainer>
      {selectedAssistant && (
        <AssistantItemSheet
          bottomSheetRef={bottomSheetRef}
          isOpen={isBottomSheetOpen}
          onClose={handleBottomSheetClose}
          assistant={selectedAssistant}
        />
      )}
    </SafeAreaContainer>
  )
}
