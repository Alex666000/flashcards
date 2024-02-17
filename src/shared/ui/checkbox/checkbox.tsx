import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CheckedIcon } from '@/shared/assets'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onChange?: (checked: boolean) => void
  position?: 'default' | 'left'
  required?: boolean
} & Omit<ComponentPropsWithoutRef<typeof CheckboxRadix.Root>, 'checked' | 'onCheckedChange'>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  (props, ref) => {
    const {
      checked,
      className,
      disabled,
      id,
      label,
      onChange,
      position = 'left',
      required,
      ...rest
    } = props

    const classNames = {
      buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === 'left' && s.left),
      container: s.container,
      indicator: s.indicator,
      label: clsx(s.label, disabled && s.disabled),
      root: s.root,
    }

    return (
      <div className={classNames.container}>
        <LabelRadix.Root className={classNames.label}>
          <div className={classNames.buttonWrapper}>
            <CheckboxRadix.Root
              checked={checked}
              className={classNames.root}
              disabled={disabled}
              id={id}
              onCheckedChange={onChange}
              ref={ref}
              required={required}
              {...rest}
            >
              <AnimatePresence initial={false}>
                {checked && (
                  <CheckboxRadix.Indicator asChild className={classNames.indicator} forceMount>
                    <motion.div
                      animate={'checked'}
                      exit={'unchecked'}
                      initial={'unchecked'}
                      variants={{
                        checked: { scale: 1 },
                        unchecked: { scale: 0.5 },
                      }}
                    >
                      <motion.div
                        variants={{
                          checked: {
                            opacity: 1,
                            strokeDashoffset: 0,
                            transition: { duration: 0.1 },
                          },
                          unchecked: {
                            opacity: 0,
                            transition: { duration: 0.1 },
                          },
                        }}
                      >
                        <CheckedIcon color={'var(--color-text-primary)'} />
                      </motion.div>
                    </motion.div>
                  </CheckboxRadix.Indicator>
                )}
              </AnimatePresence>
            </CheckboxRadix.Root>
          </div>
          {label}
        </LabelRadix.Root>
      </div>
    )
  }
)

/*- Radix - ужен для того чтобы делать компоненты которые тяжело стилизовать вручную
 <Typography as={'label'} className={classNames-lib.label} variant={'body2'}> -- это значит:
- element: label, с классом body2
*/
