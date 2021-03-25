import * as confirmMessageModule from "../../../src/shared/confirm/confirm-message-service";
import * as appNotificationModule from "../../../src/shared/notification/app-notification";


export function mockNotificationAndConfirmationModules() {


    appNotificationModule.appNotification.showSuccess=jest.fn()
    appNotificationModule.appNotification.showError=jest.fn()
    confirmMessageModule.confirmMessageService.show=jest.fn().mockImplementation(()=>{
        console.log("confirmMessageSpy called")
        return;
    })



}


