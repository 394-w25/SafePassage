import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

export const useDateSlider = () => {
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
    setSelectedDate(date)
    scrollToSelectedDate(date)
  }

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !scrollRef.current) {
      return
    }
    const touchEndX = e.touches[0].clientX
    const deltaX = touchEndX - touchStartX.current
    scrollRef.current.scrollLeft -= deltaX // Let the scroll follow the finger
    touchStartX.current = touchEndX
  }

  // Unmount cleanup
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToSelectedDate(selectedDate)
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [selectedDate])

  return { selectedDate, selectDate, handleTouchStart, handleTouchMove, scrollRef }
}
