export const countryCities: Record<string, [string, string][]> = {
  USA: [
    ['New York', 'America/New_York'],
    ['Los Angeles', 'America/Los_Angeles'],
    ['Chicago', 'America/Chicago'],
  ],
  UK: [
    ['London', 'Europe/London'],
    ['Manchester', 'Europe/London'],
    ['Liverpool', 'Europe/London'],
  ],
  Australia: [
    ['Sydney', 'Australia/Sydney'],
    ['Melbourne', 'Australia/Melbourne'],
    ['Brisbane', 'Australia/Brisbane'],
  ],
  India: [
    ['Mumbai', 'Asia/Kolkata'],
    ['Delhi', 'Asia/Kolkata'],
    ['Bangalore', 'Asia/Kolkata'],
  ],
  Germany: [
    ['Berlin', 'Europe/Berlin'],
    ['Munich', 'Europe/Berlin'],
    ['Hamburg', 'Europe/Berlin'],
  ],
  France: [
    ['Paris', 'Europe/Paris'],
    ['Marseille', 'Europe/Paris'],
    ['Lyon', 'Europe/Paris'],
  ],
  Italy: [
    ['Rome', 'Europe/Rome'],
    ['Milan', 'Europe/Rome'],
    ['Naples', 'Europe/Rome'],
  ],
  Spain: [
    ['Madrid', 'Europe/Madrid'],
    ['Barcelona', 'Europe/Madrid'],
    ['Valencia', 'Europe/Madrid'],
  ],
  Netherlands: [
    ['Amsterdam', 'Europe/Amsterdam'],
    ['Rotterdam', 'Europe/Amsterdam'],
    ['The Hague', 'Europe/Amsterdam'],
  ],
  Japan: [
    ['Tokyo', 'Asia/Tokyo'],
    ['Osaka', 'Asia/Tokyo'],
    ['Kyoto', 'Asia/Tokyo'],
  ],
  China: [
    ['Beijing', 'Asia/Shanghai'],
    ['Shanghai', 'Asia/Shanghai'],
    ['Guangzhou', 'Asia/Shanghai'],
  ],
  SouthKorea: [
    ['Seoul', 'Asia/Seoul'],
    ['Busan', 'Asia/Seoul'],
    ['Incheon', 'Asia/Seoul'],
  ],
  Singapore: [['Singapore', 'Asia/Singapore']],
  Malaysia: [['Kuala Lumpur', 'Asia/Kuala_Lumpur']],
  Thailand: [['Bangkok', 'Asia/Bangkok']],
}

export const allCountries = Object.keys(countryCities)

export const getCountryCities = (country: string): string[] => {
  return countryCities[country]?.map(([city]) => city) ?? []
}

export const getTimezone = (country?: string, city?: string): string => {
  if (city === undefined || city === '' || country === undefined || country === '') {
    if (country !== undefined) {
      return countryCities[country]?.[0][1] ?? ''
    }
    else {
      return ''
    }
  }
  return countryCities[country]?.find(([c]) => c === city)?.[1] ?? ''
}

export const COLORS = {
  ongoing: {
    main: '#f57c00',
    light: '#fff7e6',
  },
  future: {
    main: '#1976d2',
    light: '#e3f2fd',
  },
  past: {
    main: '#757575',
    light: '#f5f5f5',
  },
}

export const styles = {
  ongoing: { borderLeft: `6px solid ${COLORS.ongoing.main}`, backgroundColor: COLORS.ongoing.light },
  future: { borderLeft: `6px solid ${COLORS.future.main}`, backgroundColor: COLORS.future.light },
  past: { borderLeft: `6px solid ${COLORS.past.main}`, backgroundColor: COLORS.past.light },
}
