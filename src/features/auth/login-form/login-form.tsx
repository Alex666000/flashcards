import { useController, useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox/checkbox'
import { TextField } from '@/shared/ui/text-field/text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const emailSchema = z.string().trim().email('Please enter a valid email')

const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(3),
    rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<FormValues>({
        resolver: zodResolver(loginSchema),
    })

    console.log(errors)

    const {
        field: { onChange, value },
    } = useController({
        control, // функция
        name: 'rememberMe', // поле которое хотим контролировать
    })

    const onSubmit = (data: FormValues) => {
        console.log({ data })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                {...register('email')}
                errorMessage={errors.email?.message}
                label={'email'}
            />
            <TextField
                {...register('password')}
                errorMessage={errors.password?.message}
                label={'password'}
            />
            <Checkbox checked={value} label={'remember me'} onChange={onChange} />
            <Button type={'submit'}>Submit</Button>
        </form>
    )
}
