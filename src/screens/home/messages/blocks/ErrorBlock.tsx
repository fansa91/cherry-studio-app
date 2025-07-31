import { AlertCircle } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Text, XStack, YStack } from 'tamagui'

import { ErrorMessageBlock } from '@/types/message'

interface Props {
  block: ErrorMessageBlock
}

const MessageErrorInfo: React.FC<{ block: ErrorMessageBlock }> = ({ block }) => {
  const { t, i18n } = useTranslation()

  const HTTP_ERROR_CODES = [400, 401, 403, 404, 429, 500, 502, 503, 504]

  let errorMessage = t('errors.error_title')
  let description = ''

  if (block.error && HTTP_ERROR_CODES.includes(block.error?.status)) {
    errorMessage = block.error?.message || t('errors.error_title')
    description = t(`error.http.${block.error.status}`)
  } else if (block?.error?.message) {
    const errorKey = `error.${block.error.message}`
    description = i18n.exists(errorKey) ? t(errorKey) : block.error.message
  } else {
    description = t('error.chat.response')
  }

  return (
    <Card padding={10} backgroundColor="$red20" borderColor="$red10" borderWidth={0.5}>
      <YStack gap={10}>
        <XStack gap={10}>
          <AlertCircle size={16} color="$red100" />
          {errorMessage && (
            <Text fontWeight="600" color="$red100">
              {errorMessage}
            </Text>
          )}
        </XStack>
        <Text color="$red100" lineHeight="$1">
          {description}
        </Text>
      </YStack>
    </Card>
  )
}

const ErrorBlock: React.FC<Props> = ({ block }) => {
  return <MessageErrorInfo block={block} />
}

export default React.memo(ErrorBlock)
