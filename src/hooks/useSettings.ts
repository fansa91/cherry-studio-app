import { useAppDispatch, useAppSelector } from '@/store'
import { setTopicNamingSetting, setTranslateModelSetting } from '@/store/settings'

export function useSettings() {
  const { topicNamingSetting, translateModelSetting } = useAppSelector(state => state.settings)
  const dispatch = useAppDispatch()

  return {
    topicNamingSetting,
    translateModelSetting,
    setTopicNamingSetting: setting => dispatch(setTopicNamingSetting(setting)),
    setTranslateModelSetting: setting => dispatch(setTranslateModelSetting(setting))
  }
}
