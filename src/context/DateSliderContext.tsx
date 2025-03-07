import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

interface DateSliderContextType {
  selectedDate: Dayjs
  selectDate: (date: Dayjs) => void
  handleTouchStart: (event_: React.TouchEvent) => void
  handleTouchMove: (event_: React.TouchEvent) => void
  scrollRef: React.RefObject<HTMLDivElement | null>
}

const DateSliderContext = createContext<DateSliderContextType | undefined>(undefined)

export const DateSliderProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)

  // Scroll to the selected date (center)
  const scrollToSelectedDate = (date: Dayjs) => {
    if (!scrollRef.current) {
      return
    }
    const items = scrollRef.current.children
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement
      if (item.dataset.date === date.format('YYYY-MM-DD')) {
        scrollRef.current.scrollTo({
          left: item.offsetLeft - scrollRef.current.offsetWidth / 2 + item.offsetWidth / 2,
          behavior: 'smooth',
        })
        break
      }
    }
  }

  // Handle date selection
  const selectDate = (date: Dayjs) => {
    setSelectedDate(dayjs(date))
    scrollToSelectedDate(date)
  }

  // Handle touch start
  const handleTouchStart = (event_: React.TouchEvent) => {
    touchStartX.current = event_.touches[0].clientX
  }

  // Handle touch move
  const handleTouchMove = (event_: React.TouchEvent) => {
    if (touchStartX.current === null || !scrollRef.current) {
      return
    }
    const touchEndX = event_.touches[0].clientX
    const deltaX = touchEndX - touchStartX.current
    scrollRef.current.scrollLeft -= deltaX
    touchStartX.current = touchEndX
  }

  // Ensure correct initial scroll position
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToSelectedDate(selectedDate)
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [selectedDate])

  return (
    // eslint-disable-next-line react/no-unstable-context-value
    <DateSliderContext value={{ selectedDate, selectDate, handleTouchStart, handleTouchMove, scrollRef }}>
      {children}
    </DateSliderContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDateSlider = () => {
  const context = useContext(DateSliderContext)
  if (!context) {
    throw new Error('useDateSlider must be used within a DateSliderProvider')
  }
  return context
}
