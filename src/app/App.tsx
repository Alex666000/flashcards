import { LogoutIcon } from '@/shared/assets/icons/componentsIcons'
import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox/checkbox'
import { TextField } from '@/shared/ui/text-field'

export function App() {
    return (
        <div>
            <Button>
                <LogoutIcon size={6} />
                ffffffff
            </Button>
            <Checkbox checked />
            <TextField />
        </div>
    )
}

/*
typeof - вытаскивает типизацию Ссылки
 */
