export interface IBaseDeleteButton {
  title?: string
  id?: string | number
  customTitle?: string
  nameProp?: string
  customMessage?: string
}

export interface IDeleteButton extends IBaseDeleteButton {
  deleteItem: () => Promise<void>
}
