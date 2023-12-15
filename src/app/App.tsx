import { LogoutIcon } from '@/shared/assets/icons'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typograpfy'

export function App() {
    return (
        <div>
            <Button as={'button'} variant={'primary'}>
                <LogoutIcon /> Hello
            </Button>
            <Typography as={'h5'}>Типография текст</Typography>
        </div>
    )
}

/*
typeof - вытаскивает типизацию Ссылки
 */
