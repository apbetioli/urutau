import { useEffect, useState } from 'react'

export const LANGUAGES: Record<string, string> = {
  'en-US': 'English',
  'pt-BR': 'Português',
  es: 'Español',
}

export default function useLanguage(): [string, (value: string) => void] {
  const [language, setLanguage] = useState('en-US')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else if (LANGUAGES[navigator.language]) {
      setLanguage(navigator.language)
    }
  }, [])

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    localStorage.setItem('language', value)
  }

  return [language, handleLanguageChange]
}
