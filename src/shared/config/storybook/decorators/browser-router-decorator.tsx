import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

// декораторы - обертки над историеи с наделением ее доп своиствами
export const BrowserRouterDecorator = (storyFn: () => ReactNode) => {
  return <BrowserRouter>{storyFn()}</BrowserRouter>
}
