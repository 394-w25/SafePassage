import type { SelectChangeEvent } from '@mui/material/Select'
import { CustomInputField } from '@/components/common/UI'
import { useHealthHistory } from '@/context'
import { Box, Card, CardContent, CardHeader, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

interface Country {
  name: {
    common: string
    official: string
  }
  capital?: string[]
  cca2: string
}

interface TravelInfo {
  country?: string
  countryName?: string
  startDate?: string
  endDate?: string
  city?: string
}

interface HealthHistoryContextType {
  travelInfo: TravelInfo
  updateTravelInfo: (info: Partial<TravelInfo>) => void
}

interface CountriesNowResponse {
  error: boolean
  msg: string
  data: string[]
}

const InputTravel = () => {
  const context = useHealthHistory()
  const { travelInfo, updateTravelInfo } = context as unknown as HealthHistoryContextType

  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [cities, setCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)

  // 获取所有国家信息
  const fetchCountries = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://restcountries.com/v3.1/all')
      const data = (await response.json()) as Country[]
      // 按国家名称排序
      const sortedCountries = [...data].sort((a, b) => a.name.common.localeCompare(b.name.common))
      setCountries(sortedCountries)
    }
    catch (error) {
      console.error('Error fetching countries:', error)
    }
    finally {
      setLoading(false)
    }
  }

  // 使用首都作为备选
  const fallbackToCapital = (countryCode: string) => {
    const selectedCountryData = countries.find(country => country.cca2 === countryCode)
    if (selectedCountryData?.capital && selectedCountryData.capital.length > 0) {
      setCities(selectedCountryData.capital)
    }
    else {
      setCities([])
    }
  }

  // 获取国家的城市
  const fetchCitiesByCountry = async (countryName: string) => {
    try {
      setLoadingCities(true)
      // 使用 countriesnow API 获取城市数据
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: countryName,
        }),
      })
      const data = await response.json() as CountriesNowResponse
      if (data.error === true) {
        // 如果 API 请求失败，使用首都作为备选
        fallbackToCapital(selectedCountry)
        return
      }
      if (Boolean() && Array.isArray(data.data) && data.data.length > 0) {
        setCities(data.data)
      }
      else {
        // 如果没有城市数据，使用首都作为备选
        fallbackToCapital(selectedCountry)
      }
    }
    catch (error) {
      console.error('Error fetching cities:', error)
      // 如果出错，使用首都作为备选
      fallbackToCapital(selectedCountry)
    }
    finally {
      setLoadingCities(false)
    }
  }

  useEffect(() => {
    void fetchCountries()
  }, [])

  const handleCountryChange = (event: SelectChangeEvent) => {
    const countryCode = event.target.value
    setSelectedCountry(countryCode)
    setSelectedCity('')
    setCities([])
    if (!countryCode) {
      return
    }

    const selectedCountryData = countries.find(country => country.cca2 === countryCode)
    if (!selectedCountryData) {
      return
    }

    updateTravelInfo({
      country: countryCode,
      countryName: selectedCountryData.name.common,
    })
    // 获取该国家的城市
    void fetchCitiesByCountry(selectedCountryData.name.common)
  }

  const handleCityChange = (event: SelectChangeEvent) => {
    const cityName = event.target.value
    setSelectedCity(cityName)
    if (cityName) {
      updateTravelInfo({ city: cityName })
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardHeader
          sx={{ py: 1.5, px: 2, pb: 1, backgroundColor: '#FAFAFC' }}
          title={(
            <Typography variant="h6" sx={{ fontWeight: 'bold', p: 0, fontSize: '18px' }}>
              Travel Info
            </Typography>
          )}
        />
        <Divider sx={{ backgroundColor: '#FAFAFC' }} />
        <CardContent sx={{ py: 0.5, px: 1.5 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="country-select-label">Country</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={selectedCountry}
              label="Country"
              onChange={handleCountryChange}
              disabled={loading}
            >
              {countries.map(country => (
                <MenuItem key={country.cca2} value={country.cca2}>
                  {country.name.common}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="city-select-label">City</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              value={selectedCity}
              label="City"
              onChange={handleCityChange}
              disabled={!selectedCountry || loadingCities}
            >
              {cities.map((city, index) => (
                <MenuItem key={`${city}-${index}`} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <CustomInputField
            label="Start Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={travelInfo.startDate}
            onChange={value => updateTravelInfo({ startDate: value })}
          />

          <CustomInputField
            label="End Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={travelInfo.endDate}
            onChange={value => updateTravelInfo({ endDate: value })}
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default InputTravel
