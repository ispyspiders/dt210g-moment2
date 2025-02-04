// Interface för Todo
export interface Todo {
  title: string,
  description?: string | null,
  status: 'ej påbörjad' | 'pågående' | 'avklarad'
}