import type { SelectChangeEvent } from '@mui/material'
import { translations } from '@/utils/translations'
import LanguageIcon from '@mui/icons-material/Language'
import { MenuItem, Select, Stack } from '@mui/material'
import { useState } from 'react'
import { toast } from 'sonner'

const LanguageToggle = () => {
  const [language, setLanguage] = useState<'English' | '中文'>('English')

  const handleChangeLanguage = (event: SelectChangeEvent<'English' | '中文'>) => {
    const newLanguage = event.target.value
    setLanguage(newLanguage as 'English' | '中文')
    toast.success(translations.changeLanguageSuccess[newLanguage === 'English' ? 'EN' : 'CN'])
  }

  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mt: 2 }}>
      <LanguageIcon sx={{ mr: 1, color: 'primary.main' }} />
      <Select
        value={language}
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
        <MenuItem value="English">English</MenuItem>
        <MenuItem value="中文">中文</MenuItem>
      </Select>
    </Stack>
  )
}

export default LanguageToggle
