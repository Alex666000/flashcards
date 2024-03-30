import { SVGProps, memo } from 'react'

const Arrow = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={4} width={8} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M.23.74a.5.5 0 0 0 .82-.38L3.73 2.6 6.4.44a.5.5 0 0 0 .7.07.5.5 0 0 0-.07.73l-3 2.42a.5.5 0 0 0-.63 0l-3-2.5A.5.5 0 0 0 .22.74Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const DownArrow = memo(Arrow)
