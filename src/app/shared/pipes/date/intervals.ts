export interface Interval {
  name_single: string
  name_plural: string
  name_plural_5: string
  value: number
}

export const intervals: Interval[] = [
  { name_single: 'year_1', name_plural: "year_2_4", name_plural_5: "year_5", value: 31536000 },
  { name_single: 'month_1', name_plural: "month_2_4", name_plural_5: "month_5", value: 2592000 },
  { name_single: 'week_1', name_plural: "week_2_4", name_plural_5: "week_5", value: 604800 },
  { name_single: 'day_1', name_plural: "day_2_4", name_plural_5: "day_5", value: 86400 },
  { name_single: 'hour_1', name_plural: "hour_2_4", name_plural_5: "hour_5", value: 3600 },
  { name_single: 'min_1', name_plural: "min_2_4", name_plural_5: "min_5", value: 60 },
  { name_single: 'sec_1', name_plural: "sec_2_4", name_plural_5: "sec_5", value: 1 }
];