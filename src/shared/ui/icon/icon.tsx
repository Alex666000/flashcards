import { ComponentPropsWithoutRef, FC } from 'react'

import sprite from '../../assets/icons/sprite/sprite.svg'

type IconProps = {
    height?: number
    name: string
    width?: number
} & ComponentPropsWithoutRef<'svg'>

export const Icon: FC<IconProps> = ({ height = 24, name, width = 24, ...rest }) => {
    return (
        <svg {...rest} height={height} width={width}>
            {/* Вернуть компонент SVG с использованием иконки из спрайта */}
            <use xlinkHref={`${sprite}#${name}`} />
        </svg>
    )
}
