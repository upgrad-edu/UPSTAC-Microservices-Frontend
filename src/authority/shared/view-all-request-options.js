import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TestFlow from "../../testrequests/TestFlow";
import {React} from "../../component";

export const getRequestHistoryOptions = (requests)=>{

    const  getTestRequest = (index)=>{
        const request = requests[index]
        return request;

    }

   return  {
        filter: true,
            filterType: 'dropdown',
        responsive: 'standard',
        selectableRows:'none',
        expandableRows: true,
        expandableRowsHeader: false,
        expandableRowsOnClick: false,
        isRowExpandable: (dataIndex, expandedRows) => {
        const testRequest =  getTestRequest(dataIndex)

        return testRequest.status !== "INITIATED";
    },
        renderExpandableRow: (rowData, rowMeta) => {


        const {dataIndex} = rowMeta

        const testRequest =  getTestRequest(dataIndex)
        const colSpan = rowData.length + 1;
        return (
            <TableRow>
                <TableCell colSpan={colSpan}>
                    <TestFlow testRequest={testRequest} ></TestFlow>
                </TableCell>
            </TableRow>
        );

    }
    };
}
