

export function getPincodePositiveNegativeDistributionChartDetails(pinCodes){


    const pinCodelabels = pinCodes.map(item => item.pinCode);

    const positives = pinCodes.map(pinCode => pinCode.positiveCount)
    const negatives = pinCodes.map(pinCode => pinCode.negativeCount)

    const data = {
        labels: pinCodelabels,
        datasets: [{
            label: 'Negative',
            backgroundColor: "#005100",
            data: negatives
        }, {
            label: 'Positive',
            backgroundColor: "#ee2a3e",
            data: positives
        }]

    };

   return data;
}


export function getPincodeHomeQuarantineAdmissionDistributionChartDetails(pinCodes){


    const pinCodelabels = pinCodes.map(item => item.pinCode);

    const homeQuarantineCount = pinCodes.map(pinCode => pinCode.homeQuarantineCount)
    const admittedCount = pinCodes.map(pinCode => pinCode.admittedCount)

    const data = {
        labels: pinCodelabels,
        datasets: [{
            label: 'Admitted',
            backgroundColor: "#ee2a3e",
            data: admittedCount
        }, {
            label: 'Home Quarantine',
            backgroundColor: "#005100",
            data: homeQuarantineCount
        }]

    };



    return data;
}
export function sumOf(pinCodes,property){

  return   pinCodes.map(pinCode => pinCode[property]).reduce((total, num) =>{

        return total + num;
    })
}

export function getAllPostiveNegativeChartDetails(pinCodes){



    const positiveCount =sumOf(pinCodes,"positiveCount")
    const negativeCount =  sumOf(pinCodes,"negativeCount")


    const data = {
        labels: [
            'Positive',
            'Negative'
        ],
        datasets: [{
            data: [positiveCount, negativeCount],
            backgroundColor: [
                '#ee2a3e',
                '#005100',
            ],
            hoverBackgroundColor: [
                '#ee2a3e',
                '#005151',
            ]
        }]
    };

    return data;

}

export function getAllHomeQuarantineAdmitChartDetails(pinCodes){
    /*
    0: {positiveCount: 3, negativeCount: 23, homeQuarantineCount: 24, admittedCount: 1, testedCount: 26, …}
    1: {positiveCount: 9, negativeCount: 17, homeQuarantineCount: 25, admittedCount: 0, testedCount: 26, …}
    2: {positiveCount: 17, negativeCount: 8, homeQuarantineCount: 14, admittedCount: 11, testedCount: 25, …}
    3: {positiveCount: 20, negativeCount: 6, homeQuarantineCount: 12, admittedCount: 13, testedCount: 26, …}
    length: 4
    __proto__: Array(0)
     */


    console.log("pinCodes",pinCodes)
    const homeQuarantineCount =sumOf(pinCodes,"homeQuarantineCount")
    const admittedCount =  sumOf(pinCodes,"admittedCount")


    const data = {
        labels: [

            'Admission',
            'Home Quarantine'
        ],
        datasets: [{
            data: [admittedCount,homeQuarantineCount ],
            backgroundColor: [
                '#ee2a3e',
                '#005100',
            ],
            hoverBackgroundColor: [
                '#ee2a3e',
                '#005151',
            ]
        }]
    };

    return data;

}
