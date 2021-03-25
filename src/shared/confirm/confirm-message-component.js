import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import {confirmMessageService} from "./confirm-message-service";

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}





class ConfirmMessageComponent extends Component {


    constructor(props) {
        super(props);
        this.classes=null
        this.state = {
            "show": false,
            "message": '',
            "acceptCallback":null,
            "rejectCallback":null,
        };
    }

    componentDidMount() {

        this.subscription = confirmMessageService.onReceive().subscribe(res => {
            this.onConfirmationReceived(res);
        })
    }

    onConfirmationReceived(res) {



            this.setState({
                "show": true,
                "acceptCallback":res.accept,
                "rejectCallback":res.reject,
                "message": res.message
            });


    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    reset() {

        this.setState({
            "show": false,
            "acceptCallback":null,
            "rejectCallback":null,
            "message": ''
        });
    }


    handleCancel() {
      //  const {show, acceptCallback, message, rejectCallback} = this.state

        //
        // if(rejectCallback)
        //     rejectCallback()


        this.reset();
    }

    handleSuccess() {
        const { acceptCallback} = this.state


        if(acceptCallback)
            acceptCallback()


        this.reset();
    }

    render() {

        const {show, acceptCallback, message, rejectCallback} = this.state

        return <Fragment>

            {show == true && <div className="confirm-message-container ">

                <div className="confirm-message-inner-container">
                    <div>
                      <Dialog
                          id="dlgconfirm"
                          className="confirm-dialog-box"
                            open={show}
                            onClose={() => {
                                    this.handleCancel()
                                }}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                        >
                            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                Confirm
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {message}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button id="btnCancel" autoFocus onClick={() => {
                                    this.handleCancel()
                                }} color="secondary">
                                    Cancel
                                </Button>
                                <Button id="btnConfirm" onClick={() => {
                                    this.handleSuccess()
                                }} color="primary">
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>





                </div>

            </div>}
        </Fragment>

    }


}


export default ConfirmMessageComponent;
