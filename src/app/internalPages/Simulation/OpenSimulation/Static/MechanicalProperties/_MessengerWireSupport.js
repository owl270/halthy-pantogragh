import * as React from "react";
import {Modal, PantoModals} from "../../../../../components/PantoModal";
import PantoButton from "../../../../../components/PantoButton"
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

        const $id = 'messenger-wire-support'
        const $header = 'Messenger Wire Support'

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


                <g
                    onClick={this.showModal}
                    className={$elClass.join(" ")}
                    stroke="#00000000"
                    strokeWidth="10"
                >
                    <path d="M166.317 44.952h1.791v4.476h-1.791z"/>
                    <path d="M159.155 40.064h16.115v1.791h-16.115z"/>
                    <path d="M166.317 32.49h1.791v4.476h-1.791z"/>
                    <path d="M159.155 36.277h16.115v1.791h-16.115z"/>
                    <path d="M159.155 43.851h16.115v1.791h-16.115z"/>
                    <path d="M166.317 44.952h1.791v4.476h-1.791z"/>
                    <path d="M169.899 47.638z"/>
                </g>


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