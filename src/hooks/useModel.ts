import { useAppDispatch, useAppSelector } from '@/store'
import { setDefaultModel, setTopicNamingModel, setTranslateModel } from '@/store/llm'
import { Model } from '@/types/assistant'

export function useModel() {
  const { defaultModel, topicNamingModel, translateModel } = useAppSelector(state => state.llm)
  const dispatch = useAppDispatch()

  return {
    defaultModel,
    topicNamingModel,
    translateModel,
    setDefaultModel: (model: Model) => dispatch(setDefaultModel(model)),
    setTopicNamingModel: (model: Model) => dispatch(setTopicNamingModel(model)),
    setTranslateModel: (model: Model) => dispatch(setTranslateModel(model))
  }
}
