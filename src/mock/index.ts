import { SYSTEM_MODELS } from '@/config/models/systemModels'
import assistantsEnJsonData from '@/resources/data/assistants-en.json'
import { Assistant, Provider, Topic } from '@/types/assistant'
import { WebSearchProvider } from '@/types/websearch'

export const MOCK_AIHUBMIX_MODELS = [
  {
    id: 'o3-mini',
    name: 'o3-mini',
    provider: 'aihubmix',
    group: 'o3',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4.1',
    name: 'gpt-4.1',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.5-flash-preview-04-17',
    name: 'gemini-2.5-flash-preview-04-17',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'claude-sonnet-4-20250514',
    name: 'claude-sonnet-4-20250514',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'custom'
  },
  {
    id: 'DeepSeek-R1',
    name: 'DeepSeek-R1',
    provider: 'aihubmix',
    group: 'deepseek',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen3-235B-A22B',
    name: 'Qwen/Qwen3-235B-A22B',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'jina-reranker-m0',
    name: 'jina-reranker-m0',
    provider: 'aihubmix',
    group: 'jina',
    owned_by: 'custom'
  },
  {
    id: 'moonshot-v1-8k',
    name: 'moonshot-v1-8k',
    provider: 'aihubmix',
    group: 'moonshot',
    owned_by: 'moonshot'
  },
  {
    id: 'grok-3-mini-beta',
    name: 'grok-3-mini-beta',
    provider: 'aihubmix',
    group: 'grok',
    owned_by: 'custom'
  }
]

export const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 'silicon',
    name: 'Silicon',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.siliconflow.cn',
    models: SYSTEM_MODELS.silicon,
    isSystem: true,
    enabled: true,
    checked: true,
    isAuthed: false
  },
  {
    id: 'aihubmix',
    name: 'AiHubMix',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://aihubmix.com',
    models: MOCK_AIHUBMIX_MODELS,
    isSystem: true,
    enabled: false,
    checked: true,
    isAuthed: true
  },
  {
    id: 'ocoolai',
    name: 'ocoolAI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.ocoolai.com',
    models: SYSTEM_MODELS.ocoolai,
    isSystem: true,
    enabled: false
  },
  {
    id: 'deepseek',
    name: 'deepseek',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.deepseek.com',
    models: SYSTEM_MODELS.deepseek,
    isSystem: true,
    enabled: false
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://openrouter.ai/api/v1/',
    models: SYSTEM_MODELS.openrouter,
    isSystem: true,
    enabled: false,
    checked: true
  },
  {
    id: 'ppio',
    name: 'PPIO',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.ppinfra.com/v3/openai',
    models: SYSTEM_MODELS.ppio,
    isSystem: true,
    enabled: false
  },
  {
    id: 'alayanew',
    name: 'AlayaNew',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://deepseek.alayanew.com',
    models: SYSTEM_MODELS.alayanew,
    isSystem: true,
    enabled: false
  },
  {
    id: 'infini',
    name: 'Infini',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://cloud.infini-ai.com/maas',
    models: SYSTEM_MODELS.infini,
    isSystem: true,
    enabled: false
  },
  {
    id: 'qiniu',
    name: 'Qiniu',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.qnaigc.com',
    models: SYSTEM_MODELS.qiniu,
    isSystem: true,
    enabled: false
  },
  {
    id: 'dmxapi',
    name: 'DMXAPI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://www.dmxapi.cn',
    models: SYSTEM_MODELS.dmxapi,
    isSystem: true,
    enabled: false
  },
  {
    id: 'burncloud',
    name: 'BurnCloud',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://ai.burncloud.com',
    models: SYSTEM_MODELS.burncloud,
    isSystem: true,
    enabled: false
  },
  {
    id: 'o3',
    name: 'O3',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.o3.fan',
    models: SYSTEM_MODELS.o3,
    isSystem: true,
    enabled: false
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    type: 'anthropic',
    apiKey: '',
    apiHost: 'https://api.anthropic.com/',
    models: SYSTEM_MODELS.anthropic,
    isSystem: true,
    enabled: true,
    checked: true
  },
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'openai-response',
    apiKey: '',
    apiHost: 'https://api.openai.com',
    models: SYSTEM_MODELS.openai,
    isSystem: true,
    enabled: false,
    checked: true
  },
  {
    id: 'azure-openai',
    name: 'Azure OpenAI',
    type: 'openai',
    apiKey: '',
    apiHost: '',
    apiVersion: '',
    models: SYSTEM_MODELS['azure-openai'],
    isSystem: true,
    enabled: false
  },
  {
    id: 'gemini',
    name: 'Gemini',
    type: 'gemini',
    apiKey: '',
    apiHost: 'https://generativelanguage.googleapis.com',
    models: SYSTEM_MODELS.gemini,
    isSystem: true,
    enabled: true,
    checked: true
  },
  {
    id: 'zhipu',
    name: 'ZhiPu',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://open.bigmodel.cn/api/paas/v4/',
    models: SYSTEM_MODELS.zhipu,
    isSystem: true,
    enabled: false
  },
  {
    id: 'github',
    name: 'Github Models',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://models.inference.ai.azure.com/',
    models: SYSTEM_MODELS.github,
    isSystem: true,
    enabled: false
  },
  {
    id: 'copilot',
    name: 'Github Copilot',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.githubcopilot.com/',
    models: SYSTEM_MODELS.copilot,
    isSystem: true,
    enabled: false,
    isAuthed: false
  },
  {
    id: 'yi',
    name: 'Yi',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.lingyiwanwu.com',
    models: SYSTEM_MODELS.yi,
    isSystem: true,
    enabled: false
  },
  {
    id: 'moonshot',
    name: 'Moonshot AI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.moonshot.cn',
    models: SYSTEM_MODELS.moonshot,
    isSystem: true,
    enabled: false
  },
  {
    id: 'baichuan',
    name: 'BAICHUAN AI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.baichuan-ai.com',
    models: SYSTEM_MODELS.baichuan,
    isSystem: true,
    enabled: false
  },
  {
    id: 'dashscope',
    name: 'Bailian',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://dashscope.aliyuncs.com/compatible-mode/v1/',
    models: SYSTEM_MODELS.bailian,
    isSystem: true,
    enabled: false
  },
  {
    id: 'stepfun',
    name: 'StepFun',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.stepfun.com',
    models: SYSTEM_MODELS.stepfun,
    isSystem: true,
    enabled: false
  },
  {
    id: 'doubao',
    name: 'doubao',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://ark.cn-beijing.volces.com/api/v3/',
    models: SYSTEM_MODELS.doubao,
    isSystem: true,
    enabled: false
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.minimax.chat/v1/',
    models: SYSTEM_MODELS.minimax,
    isSystem: true,
    enabled: false
  },
  {
    id: 'groq',
    name: 'Groq',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.groq.com/openai',
    models: SYSTEM_MODELS.groq,
    isSystem: true,
    enabled: false
  },
  {
    id: 'together',
    name: 'Together',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.together.xyz',
    models: SYSTEM_MODELS.together,
    isSystem: true,
    enabled: false
  },
  {
    id: 'fireworks',
    name: 'Fireworks',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.fireworks.ai/inference',
    models: SYSTEM_MODELS.fireworks,
    isSystem: true,
    enabled: false
  },
  {
    id: 'zhinao',
    name: 'zhinao',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.360.cn',
    models: SYSTEM_MODELS.zhinao,
    isSystem: true,
    enabled: false
  },
  {
    id: 'hunyuan',
    name: 'hunyuan',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.hunyuan.cloud.tencent.com',
    models: SYSTEM_MODELS.hunyuan,
    isSystem: true,
    enabled: false
  },
  {
    id: 'nvidia',
    name: 'nvidia',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://integrate.api.nvidia.com',
    models: SYSTEM_MODELS.nvidia,
    isSystem: true,
    enabled: false
  },
  {
    id: 'grok',
    name: 'Grok',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.x.ai',
    models: SYSTEM_MODELS.grok,
    isSystem: true,
    enabled: false
  },
  {
    id: 'hyperbolic',
    name: 'Hyperbolic',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.hyperbolic.xyz',
    models: SYSTEM_MODELS.hyperbolic,
    isSystem: true,
    enabled: false
  },
  {
    id: 'mistral',
    name: 'Mistral',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.mistral.ai',
    models: SYSTEM_MODELS.mistral,
    isSystem: true,
    enabled: false
  },
  {
    id: 'jina',
    name: 'Jina',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.jina.ai',
    models: SYSTEM_MODELS.jina,
    isSystem: true,
    enabled: false
  },
  {
    id: 'gitee-ai',
    name: 'gitee ai',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://ai.gitee.com',
    models: SYSTEM_MODELS['gitee-ai'],
    isSystem: true,
    enabled: false
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.perplexity.ai/',
    models: SYSTEM_MODELS.perplexity,
    isSystem: true,
    enabled: false
  },
  {
    id: 'modelscope',
    name: 'ModelScope',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api-inference.modelscope.cn/v1/',
    models: SYSTEM_MODELS.modelscope,
    isSystem: true,
    enabled: false
  },
  {
    id: 'tencent-cloud-ti',
    name: 'Tencent Cloud TI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.lkeap.cloud.tencent.com',
    models: SYSTEM_MODELS['tencent-cloud-ti'],
    isSystem: true,
    enabled: false
  },
  {
    id: 'baidu-cloud',
    name: 'Baidu Cloud',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://qianfan.baidubce.com/v2/',
    models: SYSTEM_MODELS['baidu-cloud'],
    isSystem: true,
    enabled: false
  },
  {
    id: 'gpustack',
    name: 'GPUStack',
    type: 'openai',
    apiKey: '',
    apiHost: '',
    models: SYSTEM_MODELS.gpustack,
    isSystem: true,
    enabled: false
  },
  {
    id: 'voyageai',
    name: 'VoyageAI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.voyageai.com',
    models: SYSTEM_MODELS.voyageai,
    isSystem: true,
    enabled: false
  }
]

// 读取resources/data/assistants.json文件中的数据
export function getSystemAssistants(): Assistant[] {
  try {
    if (assistantsEnJsonData) {
      const assistants = JSON.parse(JSON.stringify(assistantsEnJsonData)) || []
      return assistants
    } else {
      return []
    }
  } catch (error) {
    console.error('Error reading assistants data:', error)
    return []
  }
}

export const INITIAL_WEBSEARCH_PROVIDERS: WebSearchProvider[] = [
  {
    id: 'tavily',
    name: 'Tavily',
    type: 'api',
    apiHost: 'https://api.tavily.com',
    apiKey: ''
  },
  {
    id: 'exa',
    name: 'Exa',
    type: 'api',
    apiHost: 'https://api.exa.ai',
    apiKey: '123'
  },
  {
    id: 'bocha',
    name: 'Bocha',
    type: 'api',
    apiHost: 'https://api.bochaai.com',
    apiKey: ''
  },
  {
    id: 'searxng',
    name: 'Searxng',
    type: 'free',
    apiHost: '',
    basicAuthUsername: '',
    basicAuthPassword: ''
  },
  {
    id: 'local-google',
    name: 'Google',
    type: 'free',
    url: 'https://www.google.com/search?q=%s'
  },
  {
    id: 'local-bing',
    name: 'Bing',
    type: 'free',
    url: 'https://cn.bing.com/search?q=%s&ensearch=1'
  },
  {
    id: 'local-baidu',
    name: 'Baidu',
    type: 'free',
    url: 'https://www.baidu.com/s?wd=%s'
  }
]

export const MOCK_TOPIC: Topic = {
  id: '123',
  assistantId: '1',
  name: 'test topic',
  messages: [],
  createdAt: new Date().toISOString(),
  updatedAt: ''
}

export const MOCK_TOPICS: Topic[] = [
  MOCK_TOPIC,
  {
    id: '456',
    assistantId: '1',
    name: 'test topic 2',
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: ''
  }
]

export const MOCK_ASSISTANTS: Assistant[] = [
  {
    id: 'assistant-test-1',
    name: 'Test Assistant 1',
    prompt: 'You are test assistant 1.',
    topics: [],
    type: 'assistant',
    emoji: '🧪',
    description: 'This is the first test assistant.',
    model: MOCK_AIHUBMIX_MODELS[0],
    defaultModel: MOCK_AIHUBMIX_MODELS[0],
    settings: {
      contextCount: 10,
      temperature: 0.7,
      topP: 1,
      maxTokens: 100,
      enableMaxTokens: true,
      streamOutput: true,
      customParameters: [{ name: 'param1', value: 'value1', type: 'string' }]
    },
    enableWebSearch: true,
    enableGenerateImage: false,
    knowledgeRecognition: 'on',
    tags: ['test', 'assistant1'],
    group: ['test-group']
  },
  {
    id: 'assistant-test-2',
    name: 'Test Assistant 2',
    prompt: 'You are test assistant 2, focus on code.',
    topics: [],
    type: 'coding-assistant',
    emoji: '💻',
    description: 'This is the second test assistant.',
    model: MOCK_AIHUBMIX_MODELS[1],
    defaultModel: MOCK_AIHUBMIX_MODELS[1],
    settings: {
      contextCount: 5,
      temperature: 0.9,
      topP: 0.9,
      maxTokens: undefined,
      enableMaxTokens: false,
      streamOutput: false,
      customParameters: []
    },
    enableWebSearch: false,
    enableGenerateImage: true,
    knowledgeRecognition: 'off',
    tags: ['test', 'coding'],
    group: ['developer-group']
  },
  {
    id: 'assistant-test-3',
    name: 'Test Assistant 3 (Initial)',
    prompt: 'Initial prompt for test assistant 3.',
    topics: [],
    type: 'general'
  }
]
