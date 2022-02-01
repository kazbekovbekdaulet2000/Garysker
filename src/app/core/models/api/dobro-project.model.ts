export interface DobroProjectModel {
  collected: string,
  id: number,
  image: string,
  is_completed: boolean,
  necessary: string,
  small_description: string,
  description?: string,
  video?: string,
  debt_dobro_file?: DocumentModel[] 
  title: string,
  body: string,
}

interface DocumentModel{
  file: string
}