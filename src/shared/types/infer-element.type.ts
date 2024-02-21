import { ElementType } from 'react'

export type InferType<T> = T extends ElementType<infer U> ? U : never
