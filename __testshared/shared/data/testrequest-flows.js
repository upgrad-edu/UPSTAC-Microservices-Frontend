const defaultResponse =[
  {
    "id": 1,
    "fromStatus": "INITIATED",
    "toStatus": "LAB_TEST_IN_PROGRESS",
    "changedBy": {
      "id": 7,
      "userName": "tester",
      "created": "2020-09-06T12:56:31.43",
      "dateOfBirth": "1963-09-06",
      "updated": "2020-09-06T12:56:31.43",
      "firstName": "tester",
      "status": "APPROVED",
      "email": "tester@upgrad.com",
      "lastName": "",
      "gender": "FEMALE",
      "phoneNumber": "9629152429",
      "address": "146/E - Ann Street,KOlkatta",
      "pinCode": 700004,
      "roles": [
        {
          "name": "TESTER"
        }
      ],
      "age": 57
    },
    "happenedOn": "2020-09-06"
  },
  {
    "id": 2,
    "fromStatus": "LAB_TEST_IN_PROGRESS",
    "toStatus": "LAB_TEST_COMPLETED",
    "changedBy": {
      "id": 7,
      "userName": "tester",
      "created": "2020-09-06T12:56:31.43",
      "dateOfBirth": "1963-09-06",
      "updated": "2020-09-06T12:56:31.43",
      "firstName": "tester",
      "status": "APPROVED",
      "email": "tester@upgrad.com",
      "lastName": "",
      "gender": "FEMALE",
      "phoneNumber": "9629152429",
      "address": "146/E - Ann Street,KOlkatta",
      "pinCode": 700004,
      "roles": [
        {
          "name": "TESTER"
        }
      ],
      "age": 57
    },
    "happenedOn": "2020-09-06"
  },
  {
    "id": 3,
    "fromStatus": "LAB_TEST_COMPLETED",
    "toStatus": "DIAGNOSIS_IN_PROCESS",
    "changedBy": {
      "id": 5,
      "userName": "doctor",
      "created": "2020-09-06T12:56:31.087",
      "dateOfBirth": "1985-09-06",
      "updated": "2020-09-06T12:56:31.087",
      "firstName": "doctor",
      "status": "APPROVED",
      "email": "doctor@upgrad.com",
      "lastName": "",
      "gender": "FEMALE",
      "phoneNumber": "9629151343",
      "address": "120/D - Gandhi Street,KOlkatta",
      "pinCode": 700004,
      "roles": [
        {
          "name": "DOCTOR"
        }
      ],
      "age": 35
    },
    "happenedOn": "2020-09-06"
  },
  {
    "id": 4,
    "fromStatus": "DIAGNOSIS_IN_PROCESS",
    "toStatus": "COMPLETED",
    "changedBy": {
      "id": 5,
      "userName": "doctor",
      "created": "2020-09-06T12:56:31.087",
      "dateOfBirth": "1985-09-06",
      "updated": "2020-09-06T12:56:31.087",
      "firstName": "doctor",
      "status": "APPROVED",
      "email": "doctor@upgrad.com",
      "lastName": "",
      "gender": "FEMALE",
      "phoneNumber": "9629151343",
      "address": "120/D - Gandhi Street,KOlkatta",
      "pinCode": 700004,
      "roles": [
        {
          "name": "DOCTOR"
        }
      ],
      "age": 35
    },
    "happenedOn": "2020-09-06"
  }
]
export const getTestFlowResponse =()=>{
  return defaultResponse
}
