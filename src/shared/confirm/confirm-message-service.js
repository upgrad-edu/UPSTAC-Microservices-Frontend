import {Subject} from 'rxjs';

const subject = new Subject();

export const confirmMessageService = {
    cb:null,
    show: (message) => {

        console.log("actual confirm")
        return new Promise(((resolve, reject) => {

            subject.next( {message,
                "accept":resolve,
                "reject":reject,
            })

        }))



    },
    onReceive: () => subject.asObservable()
};
