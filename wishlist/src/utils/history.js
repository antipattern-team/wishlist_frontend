
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.listen(() => {
    console.log('on change event');
});

export default history;