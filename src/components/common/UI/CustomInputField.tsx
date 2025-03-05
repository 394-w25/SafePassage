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
  noEarlierThanToday?: boolean // Prevents selection of past date/time
  validationError?: string // Custom error message
  inputLabel?: SlotProps<React.ElementType<InputLabelProps>, object, TextFieldOwnerState>
}

const getUserLocalISODate = (date: Date | string): string => {
  const localDate = new Date(date)
  return localDate.toISOString().split('T')[0] // YYYY-MM-DD
}

const getUserLocalISOTimestamp = (): string => {
  const now = new Date()
  return now.toTimeString().slice(0, 5)
}

const formatValue = (
  value: string | Date | number | undefined,
  type: 'date' | 'time' | 'text' | 'number' | 'tel',
): string | undefined => {
  if (value === undefined || value === null) {
    return ''
  }

  if (typeof value === 'string') {
    if (type === 'tel') {
      return formatPhoneNumber(value)
    }
    if (type === 'date' && value.endsWith('Z')) {
      return getUserLocalISODate(value)
    }
    return value
  }

  if (typeof value === 'number') {
    return value.toString()
  }

  if (value instanceof Date) {
    if (type === 'date') {
      return getUserLocalISODate(value)
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
  noEarlierThanToday = false,
  validationError,
  inputLabel,
}: CustomInputFieldProps<T>) => {
  const handleChange = (newValue: string): void => {
    let formattedValue: string | number | undefined = newValue

    if (type === 'date') {
      const localDate = new Date(`${newValue}T12:00:00`)
      formattedValue = localDate.toISOString()
    }
    else if (type === 'time') {
      formattedValue = newValue
    }
    else if (type === 'tel') {
      formattedValue = formatPhoneNumber(newValue)
    }
    else if (type === 'number') {
      formattedValue = newValue === '' ? undefined : Number(newValue)
    }

    onChange(formattedValue as T)
  }

  const minValue
    = type === 'date' && noEarlierThanToday
      ? getUserLocalISODate(new Date())
      : type === 'time' && noEarlierThanToday && value?.toString().slice(0, 10) === getUserLocalISODate(new Date())
        ? getUserLocalISOTimestamp()
        : undefined

  return (
    <TextField
      label={label}
      type={type}
      value={formatValue(value, type)}
      variant="outlined"
      error={
        Boolean(validationError) || (type === 'tel' && Boolean(value) && !isValidUSPhoneNumber(value as string))
      }
      helperText={
        validationError !== undefined
        || (type === 'tel' && Boolean(value) && !isValidUSPhoneNumber(value as string)
          ? 'Please enter in this format (XXX) XXX-XXXX'
          : '')
      }
      required={required}
      fullWidth
      margin="normal"
      sx={sx}
      size={size}
      slotProps={{
        inputLabel,
        htmlInput: minValue !== undefined ? { min: minValue } : undefined,
      }}
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
