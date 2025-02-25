import type { SxProps, TextFieldProps, Theme } from '@mui/material'
import TextField from '@mui/material/TextField'

interface CustomInputFieldProps<T> {
  label: string
  onChange: (value: T) => void
  value?: T
  type?: 'date' | 'time' | 'text' | 'number' | 'tel'
  onEnterPress?: () => void
  required?: boolean
  sx?: SxProps<Theme>
  size?: TextFieldProps['size']
  InputLabelProps?: TextFieldProps['InputLabelProps']
}

const formatValue = (value: string | Date | undefined, type: 'date' | 'time' | 'text' | 'number' | 'tel') => {
  if (value === undefined || typeof value === 'string' || typeof value === 'number') {
    return value
  }
  if (type === 'date') {
    // Format as "yyyy-MM-dd"
    return value.toISOString().split('T')[0]
  }
  if (type === 'time') {
    // Format as "HH:mm"
    return value.toISOString().split('T')[1].slice(0, 5)
  }
  return value.toString()
}

const CustomInputField = <T extends string | Date>({
  label,
  onChange,
  value,
  type = 'text',
  onEnterPress,
  required = false,
  size = 'small',
  sx,
  InputLabelProps,
}: CustomInputFieldProps<T>) => (
  <TextField
    label={label}
    type={type}
    value={formatValue(value, type)}
    variant="outlined"
    onChange={(event_) => {
      let newValue: string | Date = event_.target.value
      if (type === 'date' || type === 'time') {
        newValue = new Date(`${event_.target.value}T00:00:00Z`)
      }
      onChange(newValue as T)
    }}
    size={size}
    InputLabelProps={InputLabelProps}
    required={required}
    fullWidth
    margin="normal"
    sx={sx}
    onKeyDown={(event_) => {
      if (event_.key === 'Enter') {
        event_.preventDefault()
        onEnterPress?.()
      }
    }}
  />
)

export default CustomInputField
