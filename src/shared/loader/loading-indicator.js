import {Subject} from 'rxjs';

const subject = new Subject();

export const loadingIndicator = {
    show: () => subject.next( true),
    hide: () => subject.next(false),
    onChange: () => subject.asObservable()
};
