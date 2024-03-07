'use client'

import useLanguage, { LANGUAGES } from '@/utils/useLanguage'

export default function SettingsPage() {
  const [language, setLanguage] = useLanguage()

  return (
    <div className="w-full max-w-xl p-2 md:p-8 m-auto flex flex-col gap-2 mt-5">
      <h2 className="mb-5">Settings</h2>
      <label htmlFor="language">Select your language</label>
      <select
        value={language}
        className="mb-3"
        onChange={(e) => setLanguage(e.target.value)}
      >
        {Object.entries(LANGUAGES).map(([key, value]) => (
          <option key={key} value={key} label={value} />
        ))}
      </select>
    </div>
  )
}
