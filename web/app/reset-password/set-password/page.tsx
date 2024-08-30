'use client'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'next/navigation'
import cn from 'classnames'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Button from '@/app/components/base/button'
import { changePasswordWithToken } from '@/service/common'
import Toast from '@/app/components/base/toast'

const validPassword = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/

const ChangePasswordForm = () => {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const showErrorMessage = useCallback((message: string) => {
    Toast.notify({
      type: 'error',
      message,
    })
  }, [])

  const valid = useCallback(() => {
    if (!password.trim()) {
      showErrorMessage(t('login.error.passwordEmpty'))
      return false
    }
    if (!validPassword.test(password)) {
      showErrorMessage(t('login.error.passwordInvalid'))
      return false
    }
    if (password !== confirmPassword) {
      showErrorMessage(t('common.account.notEqual'))
      return false
    }
    return true
  }, [password, confirmPassword, showErrorMessage, t])

  const handleChangePassword = useCallback(async () => {
    const token = searchParams.get('token') || ''

    if (!valid())
      return
    try {
      await changePasswordWithToken({
        url: '/forgot-password/resets',
        body: {
          token,
          new_password: password,
          password_confirm: confirmPassword,
        },
      })
      setShowSuccess(true)
    }
    catch (error) {
      console.error(error)
    }
  }, [password, token, valid])

  return (
    <div className={
      cn(
        'flex flex-col items-center w-full grow justify-center',
        'px-6',
        'md:px-[108px]',
      )
    }>
      {!showSuccess && (
        <div className='flex flex-col md:w-[400px]'>
          <div className="w-full mx-auto">
            <h2 className="text-[32px] font-bold text-gray-900">
              {t('login.resetPassword')}
            </h2>
            <p className='mt-1 text-sm text-gray-600'>
              {t('login.changePasswordTip')}
            </p>
          </div>

          <div className="w-full mx-auto mt-6">
            <div className="bg-white">
              {/* Password */}
              <div className='mb-5'>
                <label htmlFor="password" className="my-2 flex items-center justify-between text-sm font-medium text-gray-900">
                  {t('common.account.newPassword')}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={t('login.passwordPlaceholder') || ''}
                    className={'appearance-none block w-full rounded-lg pl-[14px] px-3 py-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm pr-10'}
                  />
                </div>
                <div className='mt-1 text-xs text-gray-500'>{t('login.error.passwordInvalid')}</div>
              </div>
              {/* Confirm Password */}
              <div className='mb-5'>
                <label htmlFor="confirmPassword" className="my-2 flex items-center justify-between text-sm font-medium text-gray-900">
                  {t('common.account.confirmPassword')}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="confirmPassword"
                    type='password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder={t('login.confirmPasswordPlaceholder') || ''}
                    className={'appearance-none block w-full rounded-lg pl-[14px] px-3 py-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm pr-10'}
                  />
                </div>
              </div>
              <div>
                <Button
                  variant='primary'
                  className='w-full !text-sm'
                  onClick={handleChangePassword}
                >
                  {t('common.operation.reset')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSuccess && (
        <div className="flex flex-col md:w-[400px]">
          <div className="w-full mx-auto">
            <div className="mb-3 flex justify-center items-center w-20 h-20 p-5 rounded-[20px] border border-gray-100 shadow-lg text-[40px] font-bold">
              <CheckCircleIcon className='w-10 h-10 text-[#039855]' />
            </div>
            <h2 className="text-[32px] font-bold text-gray-900">
              {t('login.passwordChangedTip')}
            </h2>
          </div>
          <div className="w-full mx-auto mt-6">
            <Button variant='primary' className='w-full !text-sm'>
              <a href="/signin">{t('login.passwordChanged')}</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChangePasswordForm
