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

        const $id = 'messenger-wire'
        const $header = 'Messenger Wire'

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
                    d="M856.17,475.546h-.27V472.3a562.918,562.918,0,0,0,76.22-5.645c39.5-6.948,93.689-17.229,135.253-43.049l1.623,2.536c-41.757,25.942-97.484,37.991-136.876,43.537A592.59,592.59,0,0,1,856.17,475.546Z"
                    transform="translate(-682.9 -421.606)"
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