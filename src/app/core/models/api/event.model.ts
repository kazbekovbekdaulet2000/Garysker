export interface EventModel {
  id: number,
  name_ru: string,
  name_kk: string,
  description_ru: string,
  description_kk: string,
  address_ru: string,
  address_kk: string,
  address_link: string,
  event_date:string,
  bookmarks_count: number,
  bookmarked: boolean,
  views: number,
  poster: string,
  canceled: boolean,
  max_user_count: number | null,
  participants_count: number,
  participant: boolean
}