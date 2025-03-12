import { CustomInputField, CustomSelectField } from '@/components/common/UI'
import { useHealthHistory } from '@/context'
import { allCountries, getCountryCities, getTimezone } from '@/utils/tripUtils'
import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { useMemo } from 'react'
import EditableSection from './EditableSection'

const InputHealthHistory = () => {
  const { basicInfo, updateBasicInfo, healthInfos, updateHealthInfos } = useHealthHistory()

  const availableCities = useMemo(() => {
    return basicInfo.homeCountry !== undefined ? getCountryCities(basicInfo.homeCountry) : []
  }, [basicInfo.homeCountry])

  const handleCountryChange = (country: string) => {
    const firstCity = getCountryCities(country)
    const timezone = getTimezone(country, firstCity?.[0])
    updateBasicInfo(undefined, undefined, country, firstCity?.[0], timezone)
  }

  const handleCityChange = (city: string) => {
    const timezone = getTimezone(basicInfo.homeCountry, city)
    updateBasicInfo(undefined, undefined, basicInfo.homeCountry, city, timezone)
  }
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
            required
          />
          <CustomInputField
            label="Date of Birth"
            type="date"
            value={basicInfo.dateOfBirth}
            onChange={value => updateBasicInfo(undefined, value)}
            inputLabel={{ shrink: true }}
            required
          />
          <CustomSelectField
            label="Home Country"
            value={basicInfo.homeCountry}
            onChange={handleCountryChange}
            options={allCountries}
            required
          />
          <CustomSelectField
            label="Home City"
            value={basicInfo.homeCity}
            onChange={handleCityChange}
            disabled={availableCities.length === 0}
            options={availableCities}
            required
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
          {Object.entries(healthInfos).sort().map(([key, items]) => (
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
