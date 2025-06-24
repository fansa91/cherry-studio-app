import '@/i18n'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import AssistantDetailScreen from '@/screens/assistant/AssistantDetailScreen'
import AssistantMarketScreen from '@/screens/assistant/AssistantMarketScreen'
import AssistantScreen from '@/screens/assistant/AssistantScreen'
import HomeScreen from '@/screens/home/HomeScreen'
import AboutScreen from '@/screens/settings/about/AboutScreen'
import BasicDataSettingsScreen from '@/screens/settings/data/BasicDataSettingsScreen'
import DataSettingsScreen from '@/screens/settings/data/DataSettingsScreen'
import NutstoreLoginScreen from '@/screens/settings/data/NutstoreLoginScreen'
import WebDavConfigScreen from '@/screens/settings/data/WebDavConfigScreen'
import WebDavScreen from '@/screens/settings/data/WebDavScreen'
import GeneralSettingsScreen from '@/screens/settings/general/GeneralSettingsScreen'
import LanguageChangeScreen from '@/screens/settings/general/LanguageChangeScreen'
import ThemeSettingsScreen from '@/screens/settings/general/ThemeSettingsScreen'
import DefaultAssistantSettingsScreen from '@/screens/settings/model/DefaultAssistantSettingsScreen'
import ModelSettingsScreen from '@/screens/settings/model/ModelSettingsScreen'
import NamingModelSettingsScreen from '@/screens/settings/model/NamingModelSettingsScreen'
import TranslateLanguageChooseScreen from '@/screens/settings/model/TranslateLanguageChooseScreen'
import TranslateModelSettingsScreen from '@/screens/settings/model/TranslateModelSettingsScreen'
import ApiServiceScreen from '@/screens/settings/providers/ApiServiceScreen'
import ManageModelsScreen from '@/screens/settings/providers/ManageModelsScreen'
import ProviderListScreen from '@/screens/settings/providers/ProviderListScreen'
import ProviderSettingsScreen from '@/screens/settings/providers/ProviderSettingsScreen'
import ProvidersScreen from '@/screens/settings/providers/ProvidersScreen'
import SettingsScreen from '@/screens/settings/SettingsScreen'
import WebSearchProviderSettingsScreen from '@/screens/settings/websearch/WebSearchProviderSettingsScreen'
import WebSearchSettingsScreen from '@/screens/settings/websearch/WebSearchSettingsScreen'
import TopicScreen from '@/screens/topic/TopicScreen'
import WelcomeScreen from '@/screens/WelcomeScreen'
import { useAppSelector } from '@/store'
import { RootStackParamList } from '@/types/naviagate'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function MainStackNavigator() {
  const welcomeShown = useAppSelector(state => state.app.welcomeShown)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* index */}
      {!welcomeShown && <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* assistant screen */}
      <Stack.Screen name="AssistantScreen" component={AssistantScreen} />
      <Stack.Screen name="AssistantDetailScreen" component={AssistantDetailScreen} />
      <Stack.Screen name="AssistantMarketScreen" component={AssistantMarketScreen} />

      {/* Settings Screen */}
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />

      {/* Provider Screen */}
      <Stack.Screen name="ProvidersScreen" component={ProvidersScreen} />
      <Stack.Screen name="ProviderSettingsScreen" component={ProviderSettingsScreen} />
      <Stack.Screen name="ProviderListScreen" component={ProviderListScreen} />
      <Stack.Screen name="ManageModelsScreen" component={ManageModelsScreen} />
      <Stack.Screen name="ApiServiceScreen" component={ApiServiceScreen} />

      {/* Model Settings Screen */}
      <Stack.Screen name="ModelSettingsScreen" component={ModelSettingsScreen} />
      <Stack.Screen name="DefaultAssistantSettingsScreen" component={DefaultAssistantSettingsScreen} />
      <Stack.Screen name="NamingModelSettingsScreen" component={NamingModelSettingsScreen} />
      <Stack.Screen name="TranslateModelSettingsScreen" component={TranslateModelSettingsScreen} />
      <Stack.Screen name="TranslateLanguageChooseScreen" component={TranslateLanguageChooseScreen} />

      {/* Web Search Screen */}
      <Stack.Screen name="WebSearchSettingsScreen" component={WebSearchSettingsScreen} />
      <Stack.Screen name="WebSearchProviderSettingsScreen" component={WebSearchProviderSettingsScreen} />

      {/* Settings Screen */}
      <Stack.Screen name="GeneralSettingsScreen" component={GeneralSettingsScreen} />
      <Stack.Screen name="ThemeSettingsScreen" component={ThemeSettingsScreen} />
      <Stack.Screen name="LanguageChangeScreen" component={LanguageChangeScreen} />
      <Stack.Screen name="DataSettingsScreen" component={DataSettingsScreen} />
      <Stack.Screen name="BasicDataSettingsScreen" component={BasicDataSettingsScreen} />
      <Stack.Screen name="NutstoreLoginScreen" component={NutstoreLoginScreen} />
      <Stack.Screen name="WebDavScreen" component={WebDavScreen} />
      <Stack.Screen name="WebDavConfigScreen" component={WebDavConfigScreen} />

      {/* About Screen */}
      <Stack.Screen name="AboutScreen" component={AboutScreen} />

      {/* topic screen */}
      <Stack.Screen name="TopicScreen" component={TopicScreen} />
    </Stack.Navigator>
  )
}
