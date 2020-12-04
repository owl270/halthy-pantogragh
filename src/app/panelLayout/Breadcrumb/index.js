import React, {Component} from 'react';

import config from '../../../config';
import navigation from '../../../navigationMenu';

import Aux from "../../components/_Aux";

class Breadcrumb extends Component {
    state = {
        item: []
    };

    componentDidMount() {
        (navigation.items).map((item, index) => {
            if (item.type === 'group') {
                (item.children).map((item, index) => {
                    if (document.location.pathname === config.basename + item.url) {
                        this.setState({item: item}, this.changeTitle);
                    }
                })
                return false;
            }
            if (document.location.pathname === config.basename + item.url) {
                this.setState({item: item}, this.changeTitle);
            }
        })



    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps!==this.props) {
            (navigation.items).map((item, index) => {
                if (item.type === 'group') {
                    (item.children).map((item, index) => {
                        if (document.location.pathname === config.basename + item.url) {
                            this.setState({item: item}, this.changeTitle);
                        }
                    })
                    return false;
                }
                if (document.location.pathname === config.basename + item.url) {
                    this.setState({item: item}, this.changeTitle);
                }
            })
        }

    }

    changeTitle = () => {
        let title = '';
        if (this.state.item) title = this.state.item.title;
        document.title = title ? (title + ' | ' + config.defaultTitle) : config.defaultTitle;
    }


    render() {
        let breadcrumb = '';


        return (
            <Aux>
                {breadcrumb}
            </Aux>
        );
    }
}

export default Breadcrumb;