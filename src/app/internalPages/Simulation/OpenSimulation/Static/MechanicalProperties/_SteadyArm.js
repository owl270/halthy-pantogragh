import React from "react";
import {Modal, PantoModals} from "../../../../../components/PantoModal";
import PantoButton from "../../../../../components/PantoButton";
import * as actions from "../../_DataHandler/_actions";
import {connect} from "react-redux";

class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }

        this.cancelModal = this.cancelModal.bind(this)
        this.showModal = this.showModal.bind(this)
        this.okayModal = this.okayModal.bind(this)
    }


    showModal() {
        this.setState({visible: true})
    }

    cancelModal() {
        this.setState({visible: false})
    }

    okayModal() {
        this.setState({visible: false})
    }



    render() {

        let $elClass = ["--mechanical-element"]

        const $id = 'steady-arm'
        const $header = 'Steady Arm'

        const $footer = <>
            <PantoButton className={'outline'} onClick={this.cancelModal}>Cancel</PantoButton>
            <PantoButton onClick={this.okayModal}>Ok</PantoButton>
        </>

        const $content = <>
            123
        </>

        return (<>
                <PantoModals>
                    <Modal
                        name={$id}
                        header={$header}
                        footer={$footer}
                        visible={this.state.visible}
                        dismiss={this.cancelModal}
                        children={$content}
                    />
                </PantoModals>

                <path
                    onClick={this.showModal}
                    className={$elClass.join(" ")}
                    d="M169.988 117.357l-75.413-5.169V92.901h51.82V58.219h4.314v39h-51.82v10.942l71.4 4.893z"
                    stroke="#00000000"
                    strokeWidth="10"
                />
            </>
        )

    }
}


const stt2prp = (state) => {
    return {
        project: state.project
    };
};

const dispatch2prp = (dispatch) => {
    return {
        setProject: (project) => actions.setProject(dispatch, project)
    };
};

export default connect(stt2prp, dispatch2prp)(Index);