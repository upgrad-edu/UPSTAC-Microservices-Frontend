export function padAsTwoDigit(input){

    const val = "" + input;

    return val.length == 2 ? val : ("0"+val)
}


export function  getMonth(monthIndex){
    return padAsTwoDigit(monthIndex +1);
}
export function  getAsFormatted(now){

   // const now = new Date();

    return  now.getFullYear() + "-" + getMonth(now.getMonth()) + "-" + padAsTwoDigit(now.getDate())

}


