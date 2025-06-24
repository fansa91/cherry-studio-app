import { Message } from '@/types/message'

import { findImageBlocks } from './messageUtils/find'

export async function addImageFileToContents(messages: Message[]) {
  const lastAssistantMessage = messages.findLast(m => m.role === 'assistant')
  if (!lastAssistantMessage) return messages
  const blocks = await findImageBlocks(lastAssistantMessage)
  if (!blocks || blocks.length === 0) return messages

  if (blocks.every(v => !v.metadata?.generateImage)) {
    return messages
  }

  const imageFiles = blocks.map(v => v.metadata?.generateImage?.images).flat()
  const updatedAssistantMessage = {
    ...lastAssistantMessage,
    images: imageFiles
  }

  return messages.map(message => (message.id === lastAssistantMessage.id ? updatedAssistantMessage : message))
}

export function removeSvgEmptyLines(text: string): string {
  // 用正则表达式匹配 <svg> 标签内的内容
  const svgPattern = /(<svg[\s\S]*?<\/svg>)/g

  return text.replace(svgPattern, svgMatch => {
    // 将 SVG 内容按行分割,过滤掉空行,然后重新组合
    return svgMatch
      .split('\n')
      .filter(line => line.trim() !== '')
      .join('\n')
  })
}

export function escapeBrackets(text: string) {
  const pattern = /(```[\s\S]*?```|`.*?`)|\\\[([\s\S]*?[^\\])\\]|\\\((.*?)\\\)/g
  return text.replace(pattern, (match, codeBlock, squareBracket, roundBracket) => {
    if (codeBlock) {
      return codeBlock
    } else if (squareBracket) {
      return `
$$
${squareBracket}
$$
`
    } else if (roundBracket) {
      return `$${roundBracket}$`
    }

    return match
  })
}
