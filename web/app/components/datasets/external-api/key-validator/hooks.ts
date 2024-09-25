import { useState } from 'react'
import { useDebounceFn } from 'ahooks'
import type { DebouncedFunc } from 'lodash-es'
import { ValidatedApiKeyStatus } from './declarations'
import type { ValidateCallback, ValidateValue, ValidatedStatusState } from './declarations'

export const useValidateApiKey: (value: ValidateValue) => [DebouncedFunc<(validateCallback: ValidateCallback) => Promise<void>>, boolean, ValidatedStatusState] = (value) => {
  const [validating, setValidating] = useState(false)
  const [validatedStatus, setValidatedStatus] = useState<ValidatedStatusState>({})

  const { run } = useDebounceFn(async (validateCallback: ValidateCallback) => {
    if (!validateCallback.before(value)) {
      setValidating(false)
      setValidatedStatus({})
      return
    }
    setValidating(true)

    if (validateCallback.run) {
      const res = await validateCallback?.run(value)
      setValidatedStatus(
        res.status === 'success'
          ? { status: ValidatedApiKeyStatus.Success }
          : { status: ValidatedApiKeyStatus.Error, message: res.message })

      setValidating(false)
    }
  }, { wait: 1000 })

  return [run, validating, validatedStatus]
}
