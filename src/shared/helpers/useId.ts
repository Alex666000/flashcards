import { useId as useReactId } from 'react'

export const useId = (idFromComponentProps?: string) => {
    const generateId = useReactId()

    return idFromComponentProps || generateId
}
