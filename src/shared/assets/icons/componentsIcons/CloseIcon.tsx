import { IconProps, IconWrapper } from 'src/shared/assets/IconWrapper'

export const CloseIcon = (allProps: IconProps) => {
    const { svgProps: props, ...restProps } = allProps

    return (
        <IconWrapper
            icon={
                <svg
                    fill={'none'}
                    height={'100%'}
                    viewBox={'0 0 24 24'}
                    width={'100%'}
                    xmlns={'http://www.w3.org/2000/svg'}
                    {...props}
                >
                    <g clipPath={'url(#clip0_5928_8175)'}>
                        <path
                            d={
                                'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z'
                            }
                            fill={'currentColor'}
                        />
                    </g>
                    <defs>
                        <clipPath id={'clip0_5928_8175'}>
                            <rect fill={'currentColor'} height={'100%'} width={'100%'} />
                        </clipPath>
                    </defs>
                </svg>
            }
            {...restProps}
        />
    )
}
