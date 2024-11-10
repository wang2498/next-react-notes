import { useTranslation } from '@/app/i18n'
import { Trans } from 'react-i18next/TransWithoutContext'
import { locales } from '@/config'
import Link from 'next/link'

const Footer = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng, 'footer')
  return (
    <footer style={{ margin: 20 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{{ lng }}</strong> to:{' '}
      </Trans>
      {locales
        .filter((l: string) => lng !== l)
        .map((l: string, index: number) => {
          return (
            <span key={l}>
              {index > 0 && ' | '}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          )
        })}
    </footer>
  )
}
export default Footer
