import { SVGProps, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={'#E5AC39'}
    height={16}
    stroke={'#E5AC39'}
    strokeWidth={0}
    viewBox={'0 0 473.5 473.5'}
    width={16}
    xmlSpace={'preserve'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={'m473 182-162-24-75-147-73 148L0 184l118 116-26 162 146-76 146 75-27-163z'}
      fill={'currentColor'}
      stroke={'none'}
    />
  </svg>
)
const StarFilled = memo(SvgComponent)

export default StarFilled
