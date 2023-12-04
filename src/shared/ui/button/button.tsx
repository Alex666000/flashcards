import { ComponentPropsWithoutRef, ElementType } from 'react';

import s from './button.module.scss';

export const ButtonVariant = ['primary', 'secondary', 'tertiary', 'link'] as const;

export type ButtonProps<T extends ElementType = 'button'> = {
    as?: T; // Тут любой компонент или тэг
    className?: string;
    fullWidth?: boolean;
    variant?: (typeof ButtonVariant)[number];
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = 'button'>(
    props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
) => {
    const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props;

    // return <Component className={classNames} {...rest} />
    return (
        <Component
            className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
            {...rest}
        />
    );
};

/*
- as const применяется к массиву строк ['primary', 'secondary', 'tertiary', 'link'] и означает,
что каждый элемент этого массива будет иметь конкретный строковый литеральный тип, а не обобщенный тип строки.
- classNames: для склеивания классов: s - объект, к нему по ключу можем получить доступ: s[variant], вместо вариант какой класс будет, к примеру
s.primary, если нет класса то пустая строка,
1 вариант: импортируем библу - вызываем функцию: const classNames = clsx(s.variant, className, fullWidth && s.fullWidth)
2 вариант: const classNames = clsx(s.variant, className, { [s.fullWidth]: fullWidth}) -- если значение будет true то класс применится
 */
