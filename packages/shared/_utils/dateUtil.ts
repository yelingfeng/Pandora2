/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_TIME_FORMAT
): string {
  return dayjs(date).format(format)
}

export function formatToDate(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT
): string {
  return dayjs(date).format(format)
}

/**
 * 取最新2天
 */
export function getDefaultTimeValues(num = 2, format = 'YYYY-MM-DD HH:mm:00') {
  return {
    startTime: dayjs().subtract(num, 'day').format(format),
    endTime: dayjs().subtract(0, 'day').format(format)
  }
}

/**
 * 根据传入的日期字符串返回当天的起止时间范围
 * @param {string} dayStr 格式建议为 'YYYY-MM-DD'
 * @param {string} format 返回格式，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns {{startTime: string, endTime: string}}
 */
export function getDayRangeByDayStr(dayStr: string, format = DATE_TIME_FORMAT) {
  const base = dayjs(dayStr || dayjs().format(DATE_FORMAT))
  return {
    startTime: base.startOf('day').format(format),
    endTime: base.endOf('day').format(format)
  }
}

export const dateUtil = dayjs
