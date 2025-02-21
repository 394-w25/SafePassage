import { CustomInputField } from '@/components/common/UI'
import { useHealthHistory } from '@/context'
import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import EditableSection from './EditableSection'

const InputHealthHistory = () => {
  const { basicInfo, updateBasicInfo, healthInfos, updateHealthInfos } = useHealthHistory()

  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardHeader
          sx={{ py: 1.5, px: 2, pb: 1, backgroundColor: '#FAFAFC' }}
          title={(
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                p: 0,
                fontSize: '18px',
              }}
            >
              Input Info
            </Typography>
          )}
        />
        <Divider sx={{ backgroundColor: '#FAFAFC' }} />
        <CardContent sx={{ py: 0.5, px: 1.5 }}>
          <CustomInputField
            label="name"
            type="text"
            value={basicInfo.name}
            onChange={value => updateBasicInfo(value)}
          />
          <CustomInputField
            label="Date of Birth"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={basicInfo.dateOfBirth}
            onChange={value => updateBasicInfo(undefined, value)}
          />

        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardHeader
          sx={{ py: 1.5, px: 2, pb: 1, backgroundColor: '#FAFAFC' }}
          title={(
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                p: 0,
                fontSize: '18px',
              }}
            >
              Input Health History
            </Typography>
          )}
        />
        <Divider sx={{ backgroundColor: '#FAFAFC' }} />
        <CardContent sx={{ py: 0.5, px: 1.5 }}>
          {Object.entries(healthInfos).map(([key, items]) => (
            <EditableSection
              key={key}
              title={key as keyof HealthInfos}
              items={items as string[]}
              onSave={newData => updateHealthInfos({ [key]: newData })}
            />
          ))}
        </CardContent>
      </Card>
    </Box>
  )
}

export default InputHealthHistory
