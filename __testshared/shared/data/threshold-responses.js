
export const allThresholdsResponse =[
    {
        "thresholdType": "RED",
        "maxLimit": 18
    },
    {
        "thresholdType": "YELLOW",
        "maxLimit": 10
    },
    {
        "thresholdType": "GREEN",
        "maxLimit": 5
    }
]


export function getASampleThreshold(){
    return allThresholdsResponse[0]
}
