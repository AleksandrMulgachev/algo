type ObjectPrototypeNull = Record<keyof Object, never>

export interface CharsCount extends ObjectPrototypeNull {
  [s: string]: number
}

export interface TreeItem{
  char?: string
  left: TreeItem | null
  right: TreeItem | null
  weight: number
}
