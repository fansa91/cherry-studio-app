import { AlertCircle } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Text, YStack } from 'tamagui'

import { ErrorMessageBlock } from '@/types/message'

interface Props {
  block: ErrorMessageBlock
}

const MessageErrorInfo: React.FC<{ block: ErrorMessageBlock }> = ({ block }) => {
  const { t, i18n } = useTranslation()

  const HTTP_ERROR_CODES = [400, 401, 403, 404, 429, 500, 502, 503, 504]

  let errorMessage = ''
  let description = ''

  if (block.error && HTTP_ERROR_CODES.includes(block.error?.status)) {
    errorMessage = block.error?.message || ''
    description = t(`error.http.${block.error.status}`)
  } else if (block?.error?.message) {
    const errorKey = `error.${block.error.message}`
    description = i18n.exists(errorKey) ? t(errorKey) : block.error.message
  } else {
    description = t('error.chat.response')
  }

  return (
    <Card backgroundColor="$red1" borderColor="$red6" borderWidth={1} margin="$2" padding="$3">
      <YStack>
        <YStack alignItems="flex-start" flexDirection="row">
          <AlertCircle size={16} color="$red9" />
          {errorMessage && (
            <Text fontSize="$3" fontWeight="600" color="$red11">
              {errorMessage}
            </Text>
          )}
        </YStack>
        <Text fontSize="$2" color="$red11" lineHeight="$1">
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
