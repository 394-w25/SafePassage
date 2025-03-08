type Language = 'EN' | 'CN'

interface TranslationContents {
  changeLanguage: string
  changeLanguageSuccess: string
  MedicalProvider: {
    title: string
  }
}

type Translation = Record<Language, TranslationContents>
