import { AiPlugin } from './types'

// 插件构建器 - 便于创建插件
export function definePlugin(plugin: AiPlugin): AiPlugin
export function definePlugin<T extends (...args: any[]) => AiPlugin>(pluginFactory: T): T

export function definePlugin(plugin: AiPlugin | ((...args: any[]) => AiPlugin)) {
  return plugin
}
