import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import produce from 'immer'
import { RiEditLine } from '@remixicon/react'
import { LoveMessage } from '@/app/components/base/icons/src/vender/features'
import FeatureCard from '@/app/components/base/features/new-feature-panel/feature-card'
import Button from '@/app/components/base/button'
import { useFeatures, useFeaturesStore } from '@/app/components/base/features/hooks'
import type { OnFeaturesChange, OpeningStatement } from '@/app/components/base/features/types'
import { FeatureEnum } from '@/app/components/base/features/types'
import { useModalContext } from '@/context/modal-context'

type Props = {
  disabled?: boolean
  onChange?: OnFeaturesChange
}

const ConversationOpener = ({
  disabled,
  onChange,
}: Props) => {
  const { t } = useTranslation()
  const { setShowOpeningModal } = useModalContext()
  const opening = useFeatures(s => s.features.opening)
  const featuresStore = useFeaturesStore()
  const [isHovering, setIsHovering] = useState(false)
  const handleOpenOpeningModal = useCallback(() => {
    if (disabled)
      return
    const {
      features,
      setFeatures,
    } = featuresStore!.getState()
    setShowOpeningModal({
      payload: opening as OpeningStatement,
      onSaveCallback: (newOpening) => {
        const newFeatures = produce(features, (draft) => {
          draft.opening = newOpening
        })
        setFeatures(newFeatures)
        if (onChange)
          onChange(newFeatures)
      },
      onCancelCallback: () => {
        if (onChange)
          onChange(features)
      },
    })
  }, [disabled, featuresStore, onChange, opening, setShowOpeningModal])

  const handleChange = useCallback((type: FeatureEnum, enabled: boolean) => {
    const {
      features,
      setFeatures,
    } = featuresStore!.getState()

    const newFeatures = produce(features, (draft) => {
      draft[type] = {
        ...draft[type],
        enabled,
      }
    })
    setFeatures(newFeatures)
    if (onChange)
      onChange(newFeatures)
  }, [featuresStore, onChange])

  return (
    <FeatureCard
      icon={
        <div className='shrink-0 p-1 rounded-lg border-[0.5px] border-divider-subtle shadow-xs bg-util-colors-blue-light-blue-light-500'>
          <LoveMessage className='w-4 h-4 text-text-primary-on-surface' />
        </div>
      }
      title={t('appDebug.feature.conversationOpener.title')}
      value={!!opening?.enabled}
      onChange={state => handleChange(FeatureEnum.opening, state)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <>
        {!opening?.enabled && (
          <div className='min-h-8 text-text-tertiary system-xs-regular line-clamp-2'>{t('appDebug.feature.conversationOpener.description')}</div>
        )}
        {!!opening?.enabled && (
          <>
            {!isHovering && (
              <div className='min-h-8 text-text-tertiary system-xs-regular line-clamp-2'>
                {opening.opening_statement || t('appDebug.openingStatement.placeholder')}
              </div>
            )}
            {isHovering && (
              <Button className='w-full' onClick={handleOpenOpeningModal}>
                <RiEditLine className='mr-1 w-4 h-4' />
                {t('appDebug.openingStatement.writeOpener')}
              </Button>
            )}
          </>
        )}
      </>
    </FeatureCard>
  )
}

export default ConversationOpener
