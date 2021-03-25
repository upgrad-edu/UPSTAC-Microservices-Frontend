export function getAllDataWithPinCodes(inputs,  thresholds) {

    const pincodes = groupTestRequestsByPincode(inputs,thresholds)

    const results = []
    Object.keys(pincodes).forEach(key=>{
        const value = pincodes[key]
        results.push({...value,pinCode:key})

    })

    return results;
}

export function mergeZoneStatusWithPincode(thresholds, pincodes) {
    const thresholdValues = {

        "RED": 0,
        "YELLOW": 0,
        "GREEN": 0
    }

    thresholds.forEach(threshold => {

        const {thresholdType, maxLimit} = threshold
        thresholdValues[thresholdType] = maxLimit

    });

    Object.keys(pincodes).forEach(key => {

        const {positiveCount} = pincodes[key];

        if (positiveCount >= thresholdValues["RED"])
            pincodes[key]['zoneType'] = 'RED'
        else if (positiveCount >= thresholdValues["GREEN"] && positiveCount <= thresholdValues["YELLOW"])
            pincodes[key]['zoneType'] = 'YELLOW'
        else
            pincodes[key]['zoneType'] = 'GREEN'


    })

    return pincodes;
}

function createPincodeData(testRequest) {

    const {positive,negative,homeQuarantine,admitted,tested} = parseFromTestRequest(testRequest)


    return {
        positiveCount: positive,
        negativeCount: negative,
        homeQuarantineCount: homeQuarantine,
        admittedCount: admitted,
        testedCount: tested,
        zoneType: ""
    };
}

function parseFromTestRequest(item){
    const {pinCode, labResult, consultation} = item
    const {suggestion} = consultation
    const {result} = labResult
    const positive = (result == 'POSITIVE') ? 1 : 0;
    const negative = (result == 'POSITIVE') ? 0 : 1;
    const homeQuarantine = (suggestion == 'HOME_QUARANTINE') ? 1 : 0;
    const admitted = (suggestion == 'ADMIT') ? 1 : 0;
    const tested = 1;

    return {pinCode, labResult, consultation,positive,negative,homeQuarantine,admitted,tested}
}


function addTestRequestToPincode(existingPincodeData,testRequest) {


    const {positive,negative,homeQuarantine,admitted,tested} = parseFromTestRequest(testRequest)
    const {positiveCount, homeQuarantineCount, admittedCount,negativeCount, testedCount} = existingPincodeData;

    return     {
        positiveCount: positiveCount + positive,
        negativeCount: negativeCount + negative,
        homeQuarantineCount: homeQuarantineCount + homeQuarantine,
        admittedCount: admittedCount + admitted,
        testedCount: testedCount + tested
    }

}

export function groupTestRequestsByPincode(inputs, thresholds) {
    const pincodes ={}
    const items = inputs.filter(item => item.status === 'COMPLETED')

    items.forEach(function (item) {
        const {pinCode} = item
        if (pincodes.hasOwnProperty(pinCode))
            pincodes[pinCode] = addTestRequestToPincode( pincodes[pinCode],item)
         else
            pincodes[pinCode] = createPincodeData(item)


    });

    return  mergeZoneStatusWithPincode(thresholds, pincodes);;
}

export  function mergeTestRequestsAndThresholdDetails(testRequests, thresholds) {
    const pincodes =groupTestRequestsByPincode(testRequests,  thresholds);

    return testRequests.map(item =>{

        const {pinCode} =item;
        item.pinCodeInfo = pincodes[pinCode]
        return item;
    });

}
