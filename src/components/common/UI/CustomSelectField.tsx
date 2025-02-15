import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

interface CustomSelectFieldProps<T> {
  label: string
  value: T
  onChange: (value: T) => void
  options: T[]
  required?: boolean
  disabled?: boolean
  loading?: boolean
}

const CustomSelectField = <T extends string | number>({
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  loading = false,
}: CustomSelectFieldProps<T>) => {
  return (
    <FormControl fullWidth margin="normal" variant="outlined" required={required} disabled={disabled || loading}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        value={value}
        onChange={e => onChange(e.target.value as T)}
        label={label}
        labelId={`${label}-label`}
        disabled={disabled || loading}
      >
        {loading
          ? (
              <MenuItem disabled>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} />
                  Loading...
                </Box>
              </MenuItem>
            )
          : (
              options.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))
            )}
      </Select>
    </FormControl>
  )
}

export default CustomSelectField
