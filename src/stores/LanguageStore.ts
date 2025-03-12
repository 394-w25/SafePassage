import { translations } from '@/utils/translations'
import { toast } from 'sonner'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
}

const useLanguageStore = create<LanguageState>()(
  persist(
    set => ({
      language: 'EN',

      setLanguage: (language) => {
        set({ language })
        toast.success(translations[language].changeLanguageSuccess)
      },
    }),
    {
      name: 'SafePassage-language-storage',
    },
  ),
)

export default useLanguageStore
