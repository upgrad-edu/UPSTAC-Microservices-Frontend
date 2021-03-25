import axios from 'axios';
import MockAdapter from "axios-mock-adapter"


// This sets the mock adapter on the default instance


let mockedAxios=null;


export function initMockAxios() {

    mockedAxios = new MockAdapter(axios);

}

export function mockGet(inputUrl,response) {

    mockedAxios.onGet(inputUrl).reply( (config) =>{
        return [200,response];
    });

    //reply(200, response);

}
export function mockPost(inputUrl,response) {
    mockedAxios.onPost(inputUrl).reply( (config) =>{

        return [200,response];
    });
}

export function mockPut(inputUrl,response) {
    mockedAxios.onPut(inputUrl).reply( (config) =>{

        return [200,response];
    });
}

export function mockAny(inputUrl,response) {
    mockedAxios.onAny(inputUrl).reply( (config) =>{

        return [200,response];
    });
}
export function mockServerError(inputUrl) {
    mockAnyError(inputUrl,500,{message:"Server Error"})
}
export function mockAnyError(inputUrl,errorCode,response) {
    mockedAxios.onAny(inputUrl).reply( (config) =>{

        return [errorCode,response];
    });
}
export function resetMockAxios() {

    mockedAxios.restore();

}

