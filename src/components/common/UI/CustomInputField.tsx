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

const formatValue = (value: string | Date | number | undefined, type: 'date' | 'time' | 'text' | 'number' | 'tel') => {
  if (value === undefined || value === null) {
    return value
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return type === 'tel' ? formatPhoneNumber(value as string) : value
  }
  if (value instanceof Date) {
    if (type === 'date') {
      return value.toISOString().split('T')[0] // YYYY-MM-DD
    }
  }
  return value.toString()
}

const CustomInputField = <T extends string | number | Date>({
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
  const handleChange = (newValue: string): void => {
    let formattedValue: string | Date | number | undefined = newValue

    if (type === 'date') {
      formattedValue = new Date(`${newValue}T00:00:00Z`) // YYYY-MM-DD
    }
    else if (type === 'time') {
      formattedValue = newValue // HH:MM
    }
    else if (type === 'tel') {
      formattedValue = formatPhoneNumber(newValue)
    }
    else if (type === 'number') {
      formattedValue = newValue === '' ? undefined : Number(newValue)
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
