const defaultRequest ={
    "requestId": 1,
    "createdBy": {
      "id": 10,
      "userName": "ashgiovannilli",
      "created": "2020-09-04T15:41:08.135",
      "dateOfBirth": "1955-09-04",
      "updated": "2020-09-04T15:41:08.135",
      "firstName": "Ash Giovannilli",
      "status": "APPROVED",
      "email": "ashgiovannilli@upgrad.com",
      "lastName": "",
      "gender": "MALE",
      "phoneNumber": "9629151344",
      "address": "164/E - Spruce Avenue,New Delhi",
      "pinCode": 110001,
      "roles": [
        {
          "name": "USER"
        }
      ],
      "age": 65
    },
    "created": "2020-09-04",
    "status": "COMPLETED",
    "name": "Ash Giovannilli",
    "gender": "MALE",
    "address": "164/E - Spruce Avenue,New Delhi",
    "age": 71,
    "email": "ashgiovannilli@upgrad.com",
    "phoneNumber": "9629151344",
    "pinCode": 110001,
    "consultation": {
      "id": 1,
      "suggestion": "HOME_QUARANTINE",
      "comments": "can home quarantine",
      "updatedOn": "2020-09-04",
      "doctor": {
        "id": 5,
        "userName": "doctor",
        "created": "2020-09-04T15:41:07.194",
        "dateOfBirth": "1978-09-04",
        "updated": "2020-09-04T15:41:07.194",
        "firstName": "doctor",
        "status": "APPROVED",
        "email": "doctor@upgrad.com",
        "lastName": "",
        "gender": "MALE",
        "phoneNumber": "9629153781",
        "address": "251/D - Front Street North,New Delhi",
        "pinCode": 110001,
        "roles": [
          {
            "name": "DOCTOR"
          }
        ],
        "age": 42
      }
    },
    "labResult": {
      "resultId": 1,
      "bloodPressure": "130/90",
      "heartBeat": "90/95",
      "temperature": "102",
      "oxygenLevel": "90-95",
      "comments": "Asymptomatic",
      "result": "POSITIVE",
      "updatedOn": "2020-09-04",
      "tester": {
        "id": 7,
        "userName": "tester",
        "created": "2020-09-04T15:41:07.498",
        "dateOfBirth": "1984-09-04",
        "updated": "2020-09-04T15:41:07.498",
        "firstName": "tester",
        "status": "APPROVED",
        "email": "tester@upgrad.com",
        "lastName": "",
        "gender": "FEMALE",
        "phoneNumber": "9629152798",
        "address": "171/E - Heather Lane,KOlkatta",
        "pinCode": 700004,
        "roles": [
          {
            "name": "TESTER"
          }
        ],
        "age": 36
      }
    }
  }
export const createRequestWith =(id,name,status)=>{
  const result = JSON.parse(JSON.stringify(defaultRequest))
  result.requestId=id;
  result.name =name;
  result.status=status;
  return result;
}
//  INITIATED,LAB_TEST_IN_PROGRESS,LAB_TEST_COMPLETED,DIAGNOSIS_IN_PROCESS,COMPLETED
export const createInitiatedRequestWith =(id,name)=>{
  const result = createRequestWith(id,name,"INITIATED")
  result.labResult=null;
  result.consultation=null;

  return result;
}
export const createLabTestCompletedWith =(id,name)=>{
  const result = createRequestWith(id,name,"LAB_TEST_COMPLETED")
  result.consultation=null;
  return result;
}
export const createCompletedWith =(id,name)=>{
  const result = createRequestWith(id,name,"COMPLETED")
  return result;
}
export const createCompletedWithPinCode =(id,name,pinCode)=>{
  const result = createRequestWith(id,name,"COMPLETED")
  result.pinCode=pinCode
  return result;
}

  export const getAllTestRequests =()=>{

  const allRequests =[]
    allRequests.push(createInitiatedRequestWith(1,"USER"))
    allRequests.push(createLabTestCompletedWith(2,"ANOTHERUSER"))
    allRequests.push(createCompletedWith(3,"FinishedUSER"))
    allRequests.push(createCompletedWith(4,"FinishedUSERFOUR"))
    allRequests.push(createCompletedWith(5,"FinishedUSERFIVE"))
    allRequests.push(createCompletedWithPinCode(6,"FinishedUSERSIX",467814))
    allRequests.push(createCompletedWithPinCode(7,"FinishedUSERSEVEN",467814))
    allRequests.push(createCompletedWithPinCode(8,"FinishedUSEREIGHT",467814))
    return allRequests
  }
