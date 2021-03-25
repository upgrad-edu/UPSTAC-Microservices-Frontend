import React, {Component, Fragment} from 'react';
import {loadingIndicator} from './loading-indicator';
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from '@material-ui/core/styles';


const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);


class LoadingIndicatorComponent extends Component {



    constructor(props) {
        super(props);
        this.state = {
            "showLoading": false
        };
    }

    componentDidMount() {

        this.subscription =  loadingIndicator.onChange().subscribe(value => {

            this.setState({
                "showLoading": value
            })
        })
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {

        const {showLoading} = this.state

                return <Fragment>

                    { showLoading &&  <div className="progress-container">

                        <BorderLinearProgress />
                        </div>}
                </Fragment>

    }
}


export default LoadingIndicatorComponent;
