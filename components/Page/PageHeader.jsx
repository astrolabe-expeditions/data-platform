'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

import { Typography } from '../ui/Typography'
import { Left } from '../ui/Icons'
import { Button } from '../ui/Button'

const PageHeader = ({ title, className, showBack }) => {
  const t = useTranslations('PageHeader')
  const router = useRouter()

  return (
    <header className={clsx(className, 'mb-8 flex flex-col')}>
      {showBack ? (
        <Button
          leftIcon={Left}
          variant="link"
          colorScheme="gray"
          label={t('back')}
          onClick={() => router.back()}
          className="mb-5"
        />
      ) : null}
      <Typography variant="title">{title}</Typography>
    </header>
  )
}

export { PageHeader }
