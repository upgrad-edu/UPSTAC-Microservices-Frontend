export function getAsUser(userObject) {

//console.log("userObject",userObject)
    return {
        id: userObject.id,
        userName: userObject.userName,
        age: userObject.age,
        gender: userObject.gender,
        address: userObject.address,
        firstName: userObject.firstName,
        email: userObject.email,
        lastName: userObject.lastName,
        phoneNumber: userObject.phoneNumber,
        pinCode: userObject.pinCode,
        created: new Date(userObject.created),
        updated: new Date(userObject.updated),
        role: userObject.roles[0].name,


    };
}
