import { useTranslation } from '@/app/i18n/index'

export default async function Page({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await useTranslation(lng)
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t('initText')}</span>
    </div>
  )
}
