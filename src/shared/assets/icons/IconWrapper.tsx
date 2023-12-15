import { HTMLProps, ReactNode, SVGProps } from 'react'

export type IconProps = {
    color?: string
    size?: number
    svgProps?: SVGProps<SVGSVGElement>
} & Omit<HTMLProps<HTMLSpanElement>, 'color' | 'size'>

type IconWrapperProps = { icon: ReactNode } & IconProps

export const IconWrapper = ({
    color: colorProp,
    icon,
    size: sizeProp,
    ...restProps
}: IconWrapperProps) => {
    const color = colorProp ? colorProp : 'currentColor' // цвет иконки
    const size = sizeProp ? `${sizeProp}rem` : '1.2rem' // размер иконки: высота и ширина

    return (
        <span
            aria-hidden={'true'}
            role={'img'}
            style={{
                color: color,
                display: 'inline-flex',
                fontSize: 'inherit',
                height: size,
                width: size,
            }}
            {...restProps}
        >
            {icon}
        </span>
    )
}
