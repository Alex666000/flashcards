import { SVGProps, memo } from 'react'

export const Trash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={16}
    viewBox={'0 0 16 16'}
    width={16}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g>
      <path
        d={
          'M14 4h-3.33V2.9A1.61 1.61 0 0 0 9 1.33H7A1.61 1.61 0 0 0 5.33 2.9V4H2a.67.67 0 0 0 0 1.33h.67v7.34a2 2 0 0 0 2 2h6.66a2 2 0 0 0 2-2V5.33H14A.67.67 0 1 0 14 4ZM6.67 2.9c0-.1.14-.22.33-.22h2c.2 0 .33.11.33.22V4H6.67V2.9ZM12 12.67a.67.67 0 0 1-.67.66H4.67a.67.67 0 0 1-.67-.66V5.33h8v7.34Z'
        }
        fill={'var(--color-light-100)'}
      />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 0h16v16H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const Memo = memo(Trash)

export { Memo as ReactComponent }
