import {appNotification} from "./notification/app-notification";


export function errorHandler(error) {
    appNotification.showError(error)
}

function getNullOrEmpty(n) {
    return n ? n : ""
}

export function getNameAndInitials(firstName, lastName) {

    let initials ;
    let name = getNullOrEmpty(firstName) + " " + getNullOrEmpty(lastName)

    const names = name.split(" ")

    initials = (names[0].charAt(0) + "" + names[1].charAt(0)).toUpperCase();

    if(initials.trim().length ==0)
        initials ="UN"
    name=name.trim();
    return {initials, name}
}
