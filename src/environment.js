let baseUrl;
const apiVersion = "v1";

const hostname = window && window.location && window.location.hostname;

const cloudHosts = ["ec2-52-73-149-55.compute-1.amazonaws.com", "52.73.149.55"];
if (cloudHosts.includes(hostname)) {
  baseUrl = "http://ec2-52-73-149-55.compute-1.amazonaws.com:8080";
} else {
  baseUrl = "http://localhost:8080";
}

console.log('REACT_APP_DOCSVC_HOST' + process.env.REACT_APP_DOCSVC_HOST)
console.log('REACT_APP_REGSVC_HOST' + process.env.REACT_APP_REGSVC_HOST)
console.log('REACT_APP_MASTERSVC_HOST' + process.env.REACT_APP_MASTERSVC_HOST)
const docSvc = process.env.REACT_APP_DOCSVC_HOST;
const regSvc = process.env.REACT_APP_REGSVC_HOST;
const masterSvc = process.env.REACT_APP_MASTERSVC_HOST;

const DOCUMENT_UPLOAD_URL = "http://"+docSvc+":8082/documents/upload/";
const REGISTER_URL = "http://"+regSvc+":8090/auth/register";
const DOCTOR_REGISTER_URL = "http://"+regSvc+":8090/auth/doctor/register";
const TESTER_REGISTER_URL = "http://"+regSvc+":8090/auth/tester/register";
const DOWNLOAD_BASE_URL = "http://"+docSvc+":8082/documents/download/";


export const environment = {
  baseUrl,
  DOCUMENT_UPLOAD_URL,
  REGISTER_URL,
  DOCTOR_REGISTER_URL,
  TESTER_REGISTER_URL,
  DOWNLOAD_BASE_URL,
};
