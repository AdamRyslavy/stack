export type RouterType = Readonly<{
  path: string
  title: string
  element: () => JSX.Element
  exact?: boolean
}>
