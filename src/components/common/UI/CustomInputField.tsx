import type { SxProps, Theme } from '@mui/material'
import TextField from '@mui/material/TextField'

interface CustomInputFieldProps {
  label: string
  type: 'date' | 'time' | 'text'
  value: string
  onChange: (value: string) => void
  onEnterPress?: () => void
  required?: boolean
  sx?: SxProps<Theme>
}

const CustomInputField = ({
  label,
  type,
  value,
  onChange,
  onEnterPress,
  required = false,
  sx,
}: CustomInputFieldProps) => (
  <TextField
    label={label}
    type={type}
    value={value}
    variant="outlined"
    onChange={event_ => onChange(event_.target.value)}
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
