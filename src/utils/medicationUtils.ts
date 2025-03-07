import type { Dayjs } from 'dayjs'
import { getTimezone } from '@/utils/tripUtils'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * Computes the adjusted medication intake time.
 *
 * This function extracts the time portion from the given medicationTime (which is in "HH:mm" format)
 * and combines it with the date from selectedDate, so that the adjustment is applied for the correct day.
 *
 * The adjustment is performed via a linear interpolation based on the total timezone difference (in hours)
 * between the home and destination timezones, and the number of days before the trip.
 *
 * If the number of days before the trip is greater than or equal to the effective adjustment period,
 * no adjustment is applied and the function returns undefined.
 *
 * The computed adjustment is rounded to the nearest half-hour.
 *
 * @param medicationTime - Medication time as an "HH:mm" string (e.g. "08:00")
 * @param homeTimezone - Home timezone (e.g. "America/Chicago")
 * @param destinationTimezone - Destination timezone (e.g. "America/Los_Angeles")
 * @param daysBeforeTrip - Number of days until the trip starts
 * @param selectedDate - The date for which the medication time is being calculated (as a Dayjs object)
 * @param minAdjustmentDays - The minimum number of days over which the adjustment is spread (default is 3)
 * @returns An ISO string representing the adjusted medication time in the destination timezone,
 *          or undefined if the selected date is before the effective adjustment period.
 */
const computeAdjustedMedicationTime = (
  medicationTime: string,
  homeTimezone: string,
  destinationTimezone: string,
  daysBeforeTrip: number,
  selectedDate: Dayjs,
  minAdjustmentDays: number = 3,
): string | undefined => {
  // Get the date portion from the selectedDate (e.g., "2022-01-01")
  const dateStr = selectedDate.format('YYYY-MM-DD')
  // Combine the date with the medication time (append ":00" for seconds) to form a complete datetime string
  const combinedDateTimeString = `${dateStr} ${medicationTime}:00`

  // Parse the combined datetime using the home timezone to get the baseline medication time
  const homeDateTime = dayjs.tz(combinedDateTimeString, 'YYYY-MM-DD HH:mm:ss', homeTimezone)

  // Get the timezone offsets (in hours) for both home and destination timezones at the specified datetime
  const homeOffsetHours = homeDateTime.utcOffset() / 60
  const destDateTime = dayjs.tz(combinedDateTimeString, 'YYYY-MM-DD HH:mm:ss', destinationTimezone)
  const destOffsetHours = destDateTime.utcOffset() / 60

  // Calculate the total difference in hours between destination and home timezones
  const totalDiffHours = destOffsetHours - homeOffsetHours

  // Calculate how many days would be needed to fully adjust the time at a rate of maxDailyAdjustment per day.
  const maxDailyAdjustment = 3
  const requiredDays = Math.ceil(Math.abs(totalDiffHours) / maxDailyAdjustment)
  // The effective adjustment period is the larger of the calculated required days or the provided minimum adjustment days.
  const effectiveAdjustmentDays = Math.max(requiredDays, minAdjustmentDays)

  // If the selected date is too early (i.e. outside the effective adjustment period), no adjustment is needed.
  if (daysBeforeTrip >= effectiveAdjustmentDays) {
    return undefined
  }

  // Determine the adjustment fraction:
  // - When daysBeforeTrip is 0 (trip starts today), fraction = 1 (full adjustment).
  // - As daysBeforeTrip increases, fraction decreases linearly.
  const fraction = Math.max(0, Math.min(1, (effectiveAdjustmentDays - daysBeforeTrip) / effectiveAdjustmentDays))

  // Calculate the adjustment (in hours) and round to the nearest half-hour.
  const adjustmentHours = fraction * totalDiffHours
  const roundedAdjustmentHours = Math.round(adjustmentHours * 2) / 2

  // Add the rounded adjustment to the baseline medication time.
  const adjustedTime = homeDateTime.add(roundedAdjustmentHours, 'hour')

  // Return the adjusted time as an ISO string in the destination timezone.
  return adjustedTime.tz(destinationTimezone).toISOString()
}

/**
 * Computes the daily medication schedule for a single medication.
 *
 * This function calculates whether the selected date falls within any trip period, finds the nearest upcoming trip,
 * determines the destination timezone based on that trip, and computes the adjusted medication time if applicable.
 *
 * @param med - The medication object (with med.time as an "HH:mm" string)
 * @param trips - Array of trips from the user profile
 * @param homeTimezone - The user's home timezone
 * @param selectedDate - The date for which the schedule is being computed (as a Dayjs object)
 * @returns An object representing the medication schedule with:
 *          - duringTrip: a boolean indicating if the selected date is during a trip
 *          - adjusted: a boolean indicating if the time has been adjusted for the trip
 *          - time: a formatted time string (in "hh:mm A" format)
 */
export const getMedicationSchedule = (
  med: Medication,
  trips: Trip[],
  homeTimezone: string,
  selectedDate: Dayjs,
): MedicationSchedule => {
  // Determine if the selected date is within any trip period.
  const duringTrip = trips?.some(trip =>
    selectedDate.isBetween(trip.startDate, trip.endDate, 'day', '[]'),
  ) || false

  // Find the upcoming trip with the nearest start date (if any).
  const allValidTrips = trips?.filter(trip => dayjs(trip.startDate).isAfter(selectedDate))
  const upcomingTrip = allValidTrips !== undefined && allValidTrips.length > 0
    ? allValidTrips.sort((a, b) => dayjs(a.startDate).diff(dayjs(b.startDate)))[0]
    : undefined

  // Determine the destination timezone: if an upcoming trip exists, use its destination; otherwise, default to the home timezone.
  const destinationTimezone = upcomingTrip
    ? getTimezone(upcomingTrip.country, upcomingTrip.city)
    : homeTimezone

  // Calculate how many days remain until the upcoming trip starts (or 0 if there is no upcoming trip).
  const daysBeforeTrip = upcomingTrip
    ? dayjs(upcomingTrip.startDate).diff(selectedDate, 'day')
    : 0

  let adjustedTimeISO: string | undefined

  // If medication time and an upcoming trip exist, compute the adjusted medication time.
  if (med.time !== undefined && upcomingTrip !== undefined) {
    adjustedTimeISO = computeAdjustedMedicationTime(
      med.time,
      homeTimezone,
      destinationTimezone,
      daysBeforeTrip,
      selectedDate,
    )
  }

  // Format the final medication time in "hh:mm A" format.
  // If an adjusted time exists, use it; otherwise, combine the selected date with the original medication time.
  const formattedTime = med.time !== undefined
    ? (adjustedTimeISO !== undefined
        ? dayjs(adjustedTimeISO).format('hh:mm A')
        : dayjs.tz(
            `${selectedDate.format('YYYY-MM-DD')} ${med.time}:00`,
            'YYYY-MM-DD HH:mm:ss',
            homeTimezone,
          ).format('hh:mm A'))
    : 'Anytime'

  return {
    ...med,
    duringTrip,
    adjusted: adjustedTimeISO !== undefined,
    time: formattedTime,
  }
}
