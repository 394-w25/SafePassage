import { CustomInputField } from '@/components/common/UI'
import { useHealthHistory } from '@/context'
import { Box, Typography } from '@mui/material'
import EditableSection from './EditableSection'

const InputHealthHistory = () => {
  const { basicInfo, updateBasicInfo, healthInfos, updateHealthInfos } = useHealthHistory()

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', backgroundColor: '#ccc', p: 1 }}>
        Input Info
      </Typography>
      <CustomInputField
        label="name"
        type="text"
        value={basicInfo.name}
        onChange={value => updateBasicInfo(value)}
      />
      <CustomInputField
        label="Date of Birth"
        type="date"
        value={basicInfo.dateOfBirth}
        onChange={value => updateBasicInfo(undefined, value)}
      />

      <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 'bold', backgroundColor: '#ccc', p: 1 }}>
        Input Health History
      </Typography>

      {Object.entries(healthInfos).map(([key, items]) => (
        <EditableSection
          key={key}
          title={key as keyof HealthInfos}
          items={items as string[]}
          onSave={newData => updateHealthInfos({ [key]: newData })}
        />
      ))}
    </Box>
  )
}

export default InputHealthHistory
