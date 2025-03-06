import { useDateSlider } from '@/hooks/useDateSlider'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import dayjs from 'dayjs'
import { useMemo } from 'react'

const DateSlider = () => {
  const theme = useTheme()
  const { selectedDate, selectDate, handleTouchStart, handleTouchMove, scrollRef } = useDateSlider()

  const days = useMemo(() => {
    return [...Array.from({ length: 35 })].map((_, i) => dayjs().subtract(15, 'day').add(i, 'day'))
  }, [])

  return (
    <Box mb={2} p={2} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <Box textAlign="center">
        <Typography variant="subtitle1" color="textSecondary" mb={2}>
          {selectedDate.isSame(dayjs(), 'day')
            ? 'Today'
            : selectedDate.isSame(dayjs().subtract(1, 'day'), 'day')
              ? 'Yesterday'
              : selectedDate.isSame(dayjs().add(1, 'day'), 'day')
                ? 'Tomorrow'
                : selectedDate.format('ddd, MMMM D')}
        </Typography>
      </Box>

      {/* Slider date selector */}
      <Stack
        direction="row"
        spacing={1}
        ref={scrollRef}
        sx={{
          'overflowX': 'auto',
          'whiteSpace': 'nowrap',
          'display': 'flex',
          'alignItems': 'center',
          'scrollbarWidth': 'none', // Hide scrollbar
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {days.map((date) => {
          const isSelected = date.isSame(selectedDate, 'day')
          return (
            <Box
              key={date.format('YYYY-MM-DD')}
              data-date={date.format('YYYY-MM-DD')}
              onClick={(event_) => {
                event_.preventDefault()
                selectDate(date)
              }}
              sx={{
                'flex': '0 0 auto',
                'width': 50,
                'height': 50,
                'borderRadius': '50%',
                'display': 'flex',
                'flexDirection': 'column',
                'alignItems': 'center',
                'justifyContent': 'center',
                'cursor': 'pointer',
                'transition': '0.2s',
                'backgroundColor': isSelected ? theme.palette.primary.light : theme.palette.grey[200],
                'color': isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
                '&:active': {
                  backgroundColor: 'inherit',
                },
              }}
            >
              <Typography variant="caption">{date.format('dd').toUpperCase()}</Typography>
              <Typography variant="body2" fontWeight="bold">
                {date.format('D')}
              </Typography>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

export default DateSlider
