import {Subject} from 'rxjs';

const subject = new Subject();

export const appNotification = {
    showSuccess: (message,title="Information") => {
        console.log("original  appNotification showSuccess called")
        subject.next( {title,message,"variant":'success'})
    },
    showError: (message) => {
        console.log("original  appNotification showError called")
        subject.next( {title:"Error ",message,"variant":'error'})
    },
    onChange: () => subject.asObservable()
};
