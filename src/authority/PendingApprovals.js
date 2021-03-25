import {Container, Grid, React, useEffect, useSelector, useState,} from "../component"
import MUIDataTable from "mui-datatables";
import Chip from '@material-ui/core/Chip';
import {useGlobalStyles} from "../styles/GlobalStyles";
import {ViewAttachmentButton} from "./components/ViewAttachmentButton";
import {PendingApprovalActions} from "./components/PendingApprovalActions";
import {reloadPendingApprovals} from "./shared/pending-user-utils";
import {useDispatch} from "react-redux";


function PendingApprovals() {

    const classes = useGlobalStyles();

    const [data, setData] = useState([]);

    const {pendingUsers,pendingUsersLoaded,pendingUserGridData} = useSelector(state => state.authority);

    const dispatch = useDispatch()


    const columns = [
        {
            name: 'S.No',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {

                    return <strong>{dataIndex + 1}</strong>;

                },
            }
        },
        {
            name: "Name",
            options: {
                filter: true,
            }
        },
        {

            name: "Email",
            options: {
                filter: true,
            }
        },
        {
            name: 'Role',
            options: {
                filter: true,
                filterType: 'multiselect',
                customBodyRenderLite: (dataIndex) => {
                    let value = data[dataIndex][2];
                    return <Chip label={value} key={value}/>;

                },
            }
        },
        {
            name: 'View Document',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {

                    return <ViewAttachmentButton dataIndex={dataIndex} />
                },
            }
        },
        {
            name: 'Actions',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {
                    return <PendingApprovalActions dataIndex={dataIndex} />
                },
            }
        },
    ];

    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'standard',
        selectableRows: 'none'
    };



useEffect(()=>{


    if(pendingUsersLoaded== false)
        reloadPendingApprovals(dispatch);
    else{
        setData(pendingUserGridData)
    }


},[pendingUserGridData])


    return (
        <React.Fragment>
            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <h1>
                    Pending Approvals
                </h1>
                <hr/>
            </Container>
            <Container component="main" maxWidth="md">
                <Grid container>
                    <Grid item md={12}>

                        <MUIDataTable title={"List of Users"} data={data} columns={columns} options={options}/>

                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>

    )
}

export default PendingApprovals
