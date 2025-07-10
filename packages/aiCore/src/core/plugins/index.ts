// 核心类型和接口
import type { ProviderId } from '../../types'
import type { AiRequestContext } from './types'
export type { AiPlugin, AiRequestContext, HookResult, HookType, PluginManagerConfig } from './types'

// 插件管理器
export { PluginManager } from './manager'

// 工具函数
export function createContext<T extends ProviderId>(
  providerId: T,
  modelId: string,
  originalParams: any
): AiRequestContext {
  return {
    providerId,
    modelId,
    originalParams,
    metadata: {},
    startTime: Date.now(),
    requestId: `${providerId}-${modelId}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    // 占位
    recursiveCall: () => Promise.resolve(null)
  }
}

// 导出工具函数
export { createLoggingPlugin } from './built-in/logging'
export { definePlugin } from './utils'
