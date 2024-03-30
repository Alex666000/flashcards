import { SVGProps, memo } from 'react'

const Arrow = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={4} width={8} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M7.77 3.26a.5.5 0 0 1-.82.38L4.27 1.4 1.6 3.56a.5.5 0 0 1-.7-.07.5.5 0 0 1 .07-.73l3-2.42a.5.5 0 0 1 .63 0l3 2.5a.5.5 0 0 1 .18.42Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const ArrowUp = memo(Arrow)
