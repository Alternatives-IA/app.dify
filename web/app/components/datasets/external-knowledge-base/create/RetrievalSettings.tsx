import type { FC } from 'react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TopKItem from '@/app/components/base/param-item/top-k-item'
import ScoreThresholdItem from '@/app/components/base/param-item/score-threshold-item'
import cn from '@/utils/classnames'

type RetrievalSettingsProps = {
  topK: number
  scoreThreshold: number
  isInHitTesting?: boolean
  isInRetrievalSetting?: boolean
  onChange: (data: { top_k?: number; score_threshold?: number }) => void
}

const RetrievalSettings: FC<RetrievalSettingsProps> = ({ topK, scoreThreshold, onChange, isInHitTesting = false, isInRetrievalSetting = false }) => {
  const [scoreThresholdEnabled, setScoreThresholdEnabled] = useState(false)
  const { t } = useTranslation()
  return (
    <div className={cn('flex flex-col gap-2 self-stretch', isInRetrievalSetting && 'w-full max-w-[480px]')}>
      {!isInHitTesting && !isInRetrievalSetting && <div className='flex h-7 pt-1 flex-col gap-2 self-stretch'>
        <label className='text-text-secondary system-sm-semibold'>{t('dataset.retrievalSettings')}</label>
      </div>}
      <div className={cn(
        'flex gap-4 self-stretch',
        {
          'flex-col': isInHitTesting,
          'flex-row': isInRetrievalSetting,
          'flex-col sm:flex-row': !isInHitTesting && !isInRetrievalSetting,
        },
      )}>
        <div className='flex flex-col gap-1 flex-grow'>
          <TopKItem
            className='grow'
            value={topK}
            onChange={(_key, v) => onChange({ top_k: v })}
            enable={true}
          />
        </div>
        <div className='flex flex-col gap-1 flex-grow'>
          <ScoreThresholdItem
            className='grow'
            value={scoreThreshold}
            onChange={(_key, v) => onChange({ score_threshold: v })}
            enable={scoreThresholdEnabled}
            hasSwitch={true}
            onSwitchChange={(_key, v) => setScoreThresholdEnabled(v)}
          />
        </div>
      </div>
    </div>
  )
}

export default RetrievalSettings
