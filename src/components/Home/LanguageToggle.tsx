import type { SelectChangeEvent } from '@mui/material'
import { useLanguageStore } from '@/stores'
import { languageMap } from '@/utils/translations'
import LanguageIcon from '@mui/icons-material/Language'
import { MenuItem, Select, Stack } from '@mui/material'

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguageStore()

  const handleChangeLanguage = (event_: SelectChangeEvent<string>) => {
    const newLanguage = Object.entries(languageMap).find(
      ([, value]) => value === event_.target.value,
    )?.[0]

    if (newLanguage !== undefined) {
      setLanguage(newLanguage as keyof typeof languageMap)
    }
  }

  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mt: 2 }}>
      <LanguageIcon sx={{ mr: 1, color: 'primary.main' }} />
      <Select
        value={languageMap[language]}
        onChange={handleChangeLanguage}
        size="small"
        sx={{
          'minWidth': 100,
          'backgroundColor': 'background.paper',
          'borderRadius': 1,
          '& .MuiSelect-select': {
            py: 0.5,
          },
        }}
      >
        {Object.values(languageMap).map(language => (
          <MenuItem key={language} value={language}>
            {language}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  )
}

export default LanguageToggle
