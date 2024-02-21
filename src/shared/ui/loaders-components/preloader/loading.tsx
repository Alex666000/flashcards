import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    height={'150px'}
    preserveAspectRatio={'xMidYMid'}
    ref={ref}
    style={{
      background: 'none',
      display: 'block',
      margin: 'auto',
      shapeRendering: 'auto',
    }}
    viewBox={'0 0 100 100'}
    width={'150px'}
    xmlns={'http://www.w3.org/2000/svg'}
    xmlnsXlink={'http://www.w3.org/1999/xlink'}
    {...props}
  >
    <path d={'M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50'} fill={'#8c61ff'} stroke={'none'}>
      <animateTransform
        attributeName={'transform'}
        dur={'1s'}
        keyTimes={'0;1'}
        repeatCount={'indefinite'}
        type={'rotate'}
        values={'0 50 51;360 50 51'}
      />
    </path>
  </svg>
)

export default memo(forwardRef(SvgComponent))
