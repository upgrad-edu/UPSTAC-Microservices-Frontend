export const getMockedLoginResponse = () =>{

    return {
        "userName": "user",
        "message": "Success",
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwic2NvcGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNTk4OTcwODU1LCJleHAiOjE1OTkwMTQwNTV9.lfuF0zqbxS5N6PGNYq1hunPETHEqtnmmPstwLDjJo3Q"
    }
}
export const createMockedUserWithRoleAndStatus = (name, role, status) =>{

    return {
        "id": 213,
        "userName": name,
        "created": "2020-09-03T19:54:11.751",
        "dateOfBirth": "1981-11-21",
        "updated": "2020-09-03T19:54:11.751",
        "firstName": "MK",
        "status": status,
        "email": name + "@upgrad.com",
        "lastName": "Gandhi",
        "gender": "FEMALE",
        "phoneNumber": "988989232",
        "address": "Some Where in India",
        "pinCode": 602102,
        "roles": [
            {
                "name": role
            }
        ],
        "age": 39
    }
}


export const getMockedRegisterUserResponse = (name) =>{

    return createMockedUserWithRoleAndStatus(name,"USER","APPROVED")
}

export const getMockedRegisterDoctorResponse = (name) =>{

    return createMockedUserWithRoleAndStatus(name,"DOCTOR","INITIATED")
}
export const getMockedRegisterTesterResponse = (name) =>{

    return createMockedUserWithRoleAndStatus(name,"TESTER","INITIATED")
}

export const getMockedUserDetailsResponseForNormalUser = () =>{

    return getMockedUserDetailsResponseFor("user","USER");

}
export const getMockedUserDetailsResponseForTester = () =>{

    return getMockedUserDetailsResponseFor("tester","TESTER");

}
export const getMockedUserDetailsResponseForDoctor = () =>{

    return getMockedUserDetailsResponseFor("doctor","DOCTOR");

}

export const getMockedUserDetailsResponseForAuthority = () =>{

    return getMockedUserDetailsResponseFor("authority","GOVERNMENT_AUTHORITY");

}
export const getMockedUserDetailsResponseFor = (name,roleName) =>{


    return {
        "id": 1,
        "userName": name,
        "created": "2020-09-01T19:45:01.847291",
        "dateOfBirth": "1965-09-01",
        "updated": "2020-09-01T19:45:01.847291",
        "firstName": name,
        "status": "APPROVED",
        "email": name + "@upgrad.com",
        "lastName": "",
        "gender": "FEMALE",
        "phoneNumber": "9629154012",
        "address": "249/C - Clark Street,Mumbai",
        "pinCode": 400001,
        "roles": [
            {
                "name": roleName
            }
        ],
        "age": 55
    }
}
