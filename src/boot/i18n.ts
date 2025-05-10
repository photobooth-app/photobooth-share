import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import { usePreferredLanguages } from '@vueuse/core'
import messages from 'src/i18n'

const preferredLanguages = usePreferredLanguages()

export default defineBoot(({ app }) => {
  const i18n = createI18n({
    locale: preferredLanguages.value[0] || 'en-US',
    fallbackLocale: 'en-US',
    legacy: false,
    messages,
  })

  // Set i18n instance on app
  app.use(i18n)
})
