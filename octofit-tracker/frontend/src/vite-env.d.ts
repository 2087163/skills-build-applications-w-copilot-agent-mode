/// <reference types="vite/client" />

declare module '*.jsx' {
  import type { ComponentType, ReactNode } from 'react'

  const Component: ComponentType<{ children?: ReactNode }>
  export default Component
}

declare module '*.js' {
  import type { ComponentType, ReactNode } from 'react'

  const Component: ComponentType<{ children?: ReactNode }>
  export default Component
}
