import { LogoutIcon } from '@/shared/assets/icons';

import { Button } from '../shared/ui/button/button';

export function App() {
    return (
        <div>
            <Button as={'button'} variant={'primary'}>
                <LogoutIcon /> Hello
            </Button>
        </div>
    );
}

/*
typeof - вытаскивает типизацию Ссылки
 */
