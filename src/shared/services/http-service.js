import axios from "axios";
import {Observable} from "rxjs";
import {loadingIndicator} from "../loader/loading-indicator";
import {appNotification} from "../notification/app-notification";

const token = null;

function setToken(token) {

    if (token){
        console.log("setting token" , token)
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
    else
        axios.defaults.headers.common['Authorization'] = null
}


axios.interceptors.request.use(req => {
     console.log(`${req.method} ${req.url}`);

    return req;
});

function uploadFileToServer(url,data) {

    return makeAsObservable({
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        url,
        data
    })
    //
    // return new Observable((observer) => {
    //
    //     loadingIndicator.show();
    //     axios( )
    //         .then((response) => {
    //             loadingIndicator.hide();
    //             observer.next(response.data);
    //             observer.complete();
    //         })
    //         .catch((error) => {
    //             loadingIndicator.hide();
    //             console.log(error)
    //             if(error && error.response && error.response.data && error.response.data.message)
    //                 observer.error(error.response.data.message);
    //             else
    //                 observer.error("Technical error , please try again");
    //
    //
    //         });
    // });

}

function downloadFileFromServer(url,filename) {

    loadingIndicator.show();
    axios({
        url: url,
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
        loadingIndicator.hide();
        console.log( response.headers)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        //link.setAttribute('download', response.headers["content-disposition"].split("filename=")[1])
        link.click();
        window.URL.revokeObjectURL(url);
    }).catch((error) => {
        loadingIndicator.hide();
        appNotification.showError("Unable to download file from " + url)


    });

}

function makeAsObservable(request) {

    return new Observable((observer) => {
        loadingIndicator.show();
        console.log("going  for",request.url)
        axios(request)
            .then((response) => {
                loadingIndicator.hide();
                console.log("received for",request.url)
                observer.next(response.data);
                observer.complete();
            })
            .catch((error) => {
                console.log("error for",request.url)
                loadingIndicator.hide();
                if(error && error.response && error.response.data && error.response.data.message)
                    observer.error(error.response.data.message);
                else
                    observer.error("Technical error , please try again");


            });
    });

}

function post(url, data) {

    return makeAsObservable({
        method: 'post',
        url,
        data
    });

}

function get(url) {

    return makeAsObservable({
        method: 'get',
        url
    });

}

function put(url, data) {

    return makeAsObservable({
        method: 'put',
        url,
        data
    });

}

function deleteRequest(url) {

    return makeAsObservable({
        method: 'delete',
        url
    });

}

export default {setToken, delete: deleteRequest, put, get, post,uploadFileToServer,downloadFileFromServer};
// export default function cube() {
//     return {setToken, delete: deleteRequest, put, get, post};
// };
