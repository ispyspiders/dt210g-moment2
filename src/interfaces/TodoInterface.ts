// Interface för Todo
export type Status  = 'ej påbörjad' | 'pågående' | 'avklarad'


export interface Todo {
  id?: number,
  title: string,
  description?: string | null,
  status: Status
}