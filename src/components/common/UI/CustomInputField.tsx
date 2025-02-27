import type { InputLabelProps, SlotProps, SxProps, TextFieldOwnerState, TextFieldProps, Theme } from '@mui/material'
import { formatPhoneNumber, isValidUSPhoneNumber } from '@/utils/onboardingUtils'
import TextField from '@mui/material/TextField'

export interface CustomInputFieldProps<T> {
  label: string
  onChange: (value: T) => void
  value?: T
  type?: 'date' | 'time' | 'text' | 'number' | 'tel'
  onEnterPress?: () => void
  required?: boolean
  sx?: SxProps<Theme>
  size?: TextFieldProps['size']
  inputLabel?: SlotProps<React.ElementType<InputLabelProps>, object, TextFieldOwnerState>
}

const formatValue = (value: string | Date | undefined, type: 'date' | 'time' | 'text' | 'number' | 'tel') => {
  if (value === undefined || typeof value === 'string' || typeof value === 'number') {
    return type === 'tel' ? formatPhoneNumber(value as string) : value
  }
  if (type === 'date') {
    return value.toISOString().split('T')[0] // YYYY-MM-DD
  }
  if (type === 'time') {
    return value.toISOString().split('T')[1].slice(0, 5) // HH:MM
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
  inputLabel,
}: CustomInputFieldProps<T>) => {
  const handleChange = (newValue: string) => {
    let formattedValue: string | Date = newValue
    if (type === 'date' || type === 'time') {
      formattedValue = new Date(`${newValue}T00:00:00Z`)
    }
    else if (type === 'tel') {
      formattedValue = formatPhoneNumber(newValue)
    }
    onChange(formattedValue as T)
  }

  return (
    <TextField
      label={label}
      type={type}
      value={formatValue(value, type)}
      variant="outlined"
      error={type === 'tel' && Boolean(value) && !isValidUSPhoneNumber(value as string)}
      helperText={
        type === 'tel' && Boolean(value) && !isValidUSPhoneNumber(value as string)
          ? 'Please enter in this format (XXX) XXX-XXXX'
          : ''
      }
      required={required}
      fullWidth
      margin="normal"
      sx={sx}
      size={size}
      slotProps={{ inputLabel }}
      onChange={event_ => handleChange(event_.target.value)}
      onKeyDown={(event_) => {
        if (event_.key === 'Enter') {
          event_.preventDefault()
          onEnterPress?.()
        }
      }}
    />
  )
}

export default CustomInputField
