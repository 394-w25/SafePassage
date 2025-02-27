import type { SxProps, TextFieldProps, Theme } from '@mui/material'
import { Autocomplete, TextField } from '@mui/material'

interface CustomAutocompleteProps {
  label: string
  value?: string
  onChange: (value: string) => void
  onEnterPress?: () => void
  required?: boolean
  options: string[]
  sx?: SxProps<Theme>
  size?: TextFieldProps['size']
}

const CustomAutocomplete = ({
  label,
  value,
  onChange,
  onEnterPress,
  required = false,
  options,
  sx,
  size = 'small',
}: CustomAutocompleteProps) => {
  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value ?? ''}
      sx={sx}
      size={size}
      onInputChange={(_, newValue) => onChange(newValue ?? '')}
      onKeyDown={(event_) => {
        if (event_.key === 'Enter') {
          event_.preventDefault()
          onEnterPress?.()
        }
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          fullWidth
          margin="normal"
          required={required}
        />
      )}
    />
  )
}

export default CustomAutocomplete
