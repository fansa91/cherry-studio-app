import { useAppSelector } from '@/store'

export const useRuntime = () => {
  const runtime = useAppSelector(state => state.runtime)
  return runtime
}
