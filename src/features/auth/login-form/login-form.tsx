import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { ControlledCheckbox } from '@/shared/ui/controlled/controlled-checkbox'
import { TextField } from '@/shared/ui/text-field/text-field'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const emailSchema = z.string().trim().email('Please enter a valid email')

// То что в loginSchema прокидываем в name
const loginSchema = z.object({
    acceptTerms: z.boolean().optional(),
    email: emailSchema,
    password: z.string().min(3),
    rememberMe: z.boolean().optional(),
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

    const onSubmit = (data: FormValues) => {
        console.log({ data })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DevTool control={control} />
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
            <ControlledCheckbox control={control} label={'remember me'} name={'rememberMe'} />
            <Button type={'submit'}>Submit</Button>
        </form>
    )
}
