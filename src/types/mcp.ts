import { BaseTool } from './tool'

export interface MCPToolResultContent {
  type: 'text' | 'image' | 'audio' | 'resource'
  text?: string
  data?: string
  mimeType?: string
  resource?: {
    uri?: string
    text?: string
    mimeType?: string
    blob?: string
  }
}

export interface MCPCallToolResponse {
  content: MCPToolResultContent[]
  isError?: boolean
}

export interface MCPConfigSample {
  command: string
  args: string[]
  env?: Record<string, string> | undefined
}
export interface MCPServer {
  id: string
  name: string
  type?: 'stdio' | 'sse' | 'inMemory' | 'streamableHttp'
  description?: string
  baseUrl?: string
  command?: string
  registryUrl?: string
  args?: string[]
  env?: Record<string, string>
  isActive: boolean
  disabledTools?: string[] // List of tool names that are disabled for this server
  configSample?: MCPConfigSample
  headers?: Record<string, string> // Custom headers to be sent with requests to this server
  searchKey?: string
  provider?: string // Provider name for this server like ModelScope, Higress, etc.
  providerUrl?: string // URL of the MCP server in provider's website or documentation
  logoUrl?: string // URL of the MCP server's logo
  tags?: string[] // List of tags associated with this server
  timeout?: number // Timeout in seconds for requests to this server, default is 60 seconds
}
export interface MCPToolInputSchema {
  type: string
  title: string
  description?: string
  required?: string[]
  properties: Record<string, object>
}

interface BaseToolResponse {
  id: string // unique id
  tool: BaseTool
  arguments: Record<string, unknown> | undefined
  status: string // 'invoking' | 'done'
  response?: any
}

export interface ToolUseResponse extends BaseToolResponse {
  toolUseId: string
}

export interface ToolCallResponse extends BaseToolResponse {
  // gemini tool call id might be undefined
  toolCallId?: string
}

export type MCPToolResponse = ToolUseResponse | ToolCallResponse
