import * as React from "react";
import Index from "../../../../components/PantoModal";
import modalProps from "./modalProps"
export default class MechanicalModal extends React.Component {


    render() {

        return (
            <Index
                visible={this.props.visible}
                dismiss={this.props.cancel}
                name={this.props.name}
                header={modalProps[this.props.name].header()}
            >
                <div className={'mechanical-properties-modal-body'}>
                    {modalProps[this.props.name].children(
                        {},
                        <MechanicalModalButton
                            cancel={this.props.cancel}
                            okay={this.props.okay}
                        />
                    )}
                </div>
            </Index>
        )
    }
}


export class MechanicalModalButton extends React.Component {
    render() {
        return (
            <div className={'button-group'}>
                <button className={'cancel-btn'} onClick={this.props.cancel}>Cancel</button>
                <button onClick={this.props.okay}>OK</button>
            </div>
        )
    }
}


// contact wire


// <div className={'input-group ' + this.state.classNameInputs.contact_wire.contact_wire_counts}>
//     <label>Number of contact wire</label>
//     <input name={['contact_wire', 'contact_wire_counts']}
//            onChange={this.changesHandler}
//            onKeyDown={this.keyPressHandler}
//            disabled
//            value={this.state.draftsData.contact_wire.contact_wire_counts}/>
// </div>
//
// <div className={'input-group ' + this.state.classNameInputs.contact_wire.tension_per_wire}>
//     <label>Tension per wire (N)</label>
//     <input name={['contact_wire', 'tension_per_wire']}
//            onChange={this.changesHandler}
//            onKeyDown={this.keyPressHandler}
//            value={this.state.draftsData.contact_wire.tension_per_wire}/>
// </div>
//
// <div className={'input-group ' + this.state.classNameInputs.contact_wire.young_modules}>
//     <label>Young's modules (kN/mm<sup>2</sup>)</label>
//     <input name={['contact_wire', 'young_modules']}
//            onChange={this.changesHandler}
//            onKeyDown={this.keyPressHandler}
//            value={this.state.draftsData.contact_wire.young_modules}/>
// </div>
//
// <div className={'input-group ' + this.state.classNameInputs.contact_wire.mass_per_length}>
//     <label>Mass per length (kg/m)</label>
//     <input name={['contact_wire', 'mass_per_length']}
//            onChange={this.changesHandler}
//            onKeyDown={this.keyPressHandler}
//            value={this.state.draftsData.contact_wire.mass_per_length}/>
// </div>
//
// <div className={'input-group ' + this.state.classNameInputs.contact_wire.cross_section}>
//     <label>Cross section (mm<sup>2</sup>)</label>
//     <input name={['contact_wire', 'cross_section']}
//            onChange={this.changesHandler}
//            onKeyDown={this.keyPressHandler}
//            value={this.state.draftsData.contact_wire.cross_section}/>
// </div>
//
// <div className={'button-group'}>
//     <button className={'cancel-btn'} onClick={() => {
//         this.cancelModalsHandler('contact_wire')
//     }}>Cancel
//     </button>
//     <button onClick={() => {
//         this.okayModalsHandler('contact_wire')
//     }}>OK
//     </button>
// </div>
//
//

// <PantoModal
//     visible={this.state.modal_messenger_wire_visible}
//     dismiss={this.cancelModalsHandler}
//     name={'messenger_wire'}
//     header={'Messenger Wire'}>
//
//     <div className={'mechanical-properties-modal-body'}>
//
//         <div className={'input-group ' + this.state.classNameInputs.messenger_wire.contact_wire_counts}>
//             <label>Number of Messenger wire</label>
//             <input name={['messenger_wire', 'messenger_wire_counts']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    disabled
//                    value={this.state.draftsData.messenger_wire.messenger_wire_counts}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.messenger_wire.tension_per_wire}>
//             <label>Tension per wire (N)</label>
//             <input name={['messenger_wire', 'tension_per_wire']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.messenger_wire.tension_per_wire}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.messenger_wire.young_modules}>
//             <label>Young's modules (kN/mm<sup>2</sup>)</label>
//             <input name={['messenger_wire', 'young_modules']}
//                    onKeyDown={this.keyPressHandler}
//                    onChange={this.changesHandler}
//                    value={this.state.draftsData.messenger_wire.young_modules}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.messenger_wire.mass_per_length}>
//             <label>Mass per length (kg/m)</label>
//             <input name={['messenger_wire', 'mass_per_length']}
//                    onKeyDown={this.keyPressHandler}
//                    onChange={this.changesHandler}
//                    value={this.state.draftsData.messenger_wire.mass_per_length}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.messenger_wire.cross_section}>
//             <label>Cross section (mm<sup>2</sup>)</label>
//             <input name={['messenger_wire', 'cross_section']}
//                    onKeyDown={this.keyPressHandler}
//                    onChange={this.changesHandler}
//                    value={this.state.draftsData.messenger_wire.cross_section}/>
//         </div>
//
//         <div className={'button-group'}>
//             <button className={'cancel-btn'} onClick={() => {
//                 this.cancelModalsHandler('messenger_wire')
//             }}>Cancel
//             </button>
//             <button onClick={() => {
//                 this.okayModalsHandler('messenger_wire')
//             }}>OK
//             </button>
//         </div>
//
//     </div>
//
// </PantoModal>


// <PantoModal
//     visible={this.state.modal_stitch_wire_visible}
//     dismiss={this.cancelModalsHandler}
//     name={'stitch_wire'}
//     header={'Stitch Wire'}>
//
//     <div className={'mechanical-properties-modal-body'}>
//
//         <div className={'input-group ' + this.state.classNameInputs.stitch_wire.clamp_mass}>
//             <label>Mass of the clamp of stitch wire to the messenger cable (kg)</label>
//             <input name={['stitch_wire', 'clamp_mass']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.stitch_wire.clamp_mass}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.stitch_wire.young_modules}>
//             <label>Young's modules (kN/mm<sup>2</sup>)</label>
//             <input name={['stitch_wire', 'young_modules']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.stitch_wire.young_modules}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.stitch_wire.mass_per_length}>
//             <label>Mass per length (kg/m)</label>
//             <input name={['stitch_wire', 'mass_per_length']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.stitch_wire.mass_per_length}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.stitch_wire.cross_section}>
//             <label>Cross section (mm<sup>2</sup>)</label>
//             <input name={['stitch_wire', 'cross_section']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.stitch_wire.cross_section}/>
//         </div>
//
//         <div className={'button-group'}>
//             <button className={'cancel-btn'} onClick={() => {
//                 this.cancelModalsHandler('stitch_wire')
//             }}>Cancel
//             </button>
//             <button onClick={() => {
//                 this.okayModalsHandler('stitch_wire')
//             }}>OK
//             </button>
//         </div>
//
//     </div>
//
// </PantoModal>


// <PantoModal
//     visible={this.state.modal_dropper_visible}
//     dismiss={this.cancelModalsHandler}
//     name={'dropper'}
//     header={'Dropper'}>
//
//     <div className={'mechanical-properties-modal-body'}>
//
//         <div className={'input-group ' + this.state.classNameInputs.dropper.tension_stiffness}>
//             <label>Stiffness for tension (N/m)</label>
//             <input name={['dropper', 'tension_stiffness']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.dropper.tension_stiffness}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.dropper.compression_stiffness}>
//             <label>Stiffness for compression (N/m)</label>
//             <input name={['dropper', 'compression_stiffness']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.dropper.compression_stiffness}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.dropper.messenger_wire_clamp}>
//             <label>Clamp on messenger wire (kg)</label>
//             <input name={['dropper', 'messenger_wire_clamp']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.dropper.messenger_wire_clamp}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.dropper.contact_wire_clamp}>
//             <label>Clamp on contact wire (kg)</label>
//             <input name={['dropper', 'contact_wire_clamp']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.dropper.contact_wire_clamp}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.dropper.mass_per_length}>
//             <label>Mass per length (kg/m)</label>
//             <input name={['dropper', 'mass_per_length']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.dropper.mass_per_length}/>
//         </div>
//
//         <div className={'button-group'}>
//             <button className={'cancel-btn'} onClick={() => {
//                 this.cancelModalsHandler('dropper')
//             }}>Cancel
//             </button>
//             <button onClick={() => {
//                 this.okayModalsHandler('dropper')
//             }}>OK
//             </button>
//         </div>
//
//     </div>
//
// </PantoModal>


// <PantoModal
//     visible={this.state.modal_messenger_wire_support_visible}
//     dismiss={this.cancelModalsHandler}
//     name={'messenger_wire_support'}
//     header={[
//         <h4>Messenger Wire Support</h4>,
//         <PantoSwitchButton
//             label={'fix'}
//             checked={[
//                 this.state.draftsData.messenger_wire_support.fix_status,
//                 () => {this.changesHandler({target: ['messenger_wire_support', 'fix_status'], val: !this.state.draftsData.messenger_wire_support.fix_status})}
//             ]}
//         />,
//     ]}
// >
//
//     <div className={'mechanical-properties-modal-body'}>
//
//         <div className={'variables'}>
//             <div className={'input-group ' + this.state.classNameInputs.messenger_wire_support.stiffness}>
//                 <label>Stiffness (kN/m)</label>
//                 <input name={['messenger_wire_support', 'stiffness']}
//                        onChange={this.changesHandler}
//                        onKeyDown={this.keyPressHandler}
//                        value={this.state.draftsData.messenger_wire_support.stiffness}
//                        disabled={this.state.draftsData.messenger_wire_support.fix_status}
//                 />
//             </div>
//
//             <div className={'input-group ' + this.state.classNameInputs.messenger_wire_support.damping}>
//                 <label>Damping (Ns/m)</label>
//                 <input name={['messenger_wire_support', 'damping']}
//                        onChange={this.changesHandler}
//                        onKeyDown={this.keyPressHandler}
//                        value={this.state.draftsData.messenger_wire_support.damping}
//                        disabled={this.state.draftsData.messenger_wire_support.fix_status}
//                 />
//             </div>
//         </div>
//
//
//         <div className={'button'}>
//
//             <div className="load_dynamic_response_btn" onClick={()=>{this.load_dynamic_response_btn('messenger_wire_support')}}>
//                 <i className={'panto-icon ph-chart'}/>
//                 <label>Load dynamic response</label>
//             </div>
//
//
//             <div className={'button-group'}>
//                 <button className={'cancel-btn'} onClick={() => {
//                     this.cancelModalsHandler('messenger_wire_support')
//                 }}>Cancel
//                 </button>
//                 <button onClick={() => {
//                     this.okayModalsHandler('messenger_wire_support')
//                 }}>OK
//                 </button>
//             </div>
//
//         </div>
//
//     </div>
//
// </PantoModal>


// <PantoModal
//     visible={this.state.modal_steady_arm_visible}
//     dismiss={this.cancelModalsHandler}
//     name={'steady_arm'}
//     header={'Steady Arm'}>
//
//     <div className={'mechanical-properties-modal-body'}>
//
//         <div className={'input-group ' + this.state.classNameInputs.steady_arm.steady_arm_count}>
//             <label>Number of steady arms</label>
//             <input name={['steady_arm', 'steady_arm_count']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    disabled
//                    value={this.state.draftsData.steady_arm.steady_arm_count}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.steady_arm.length}>
//             <label>Length (m)</label>
//             <input name={['steady_arm', 'length']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.steady_arm.length}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.steady_arm.mass_per_length}>
//             <label>Mass per length (kg/m)</label>
//             <input name={['steady_arm', 'mass_per_length']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.steady_arm.mass_per_length}/>
//         </div>
//
//         <div className={'input-group ' + this.state.classNameInputs.steady_arm.clamp_mass}>
//             <label>Mass of clamp (kg)</label>
//             <input name={['steady_arm', 'clamp_mass']}
//                    onChange={this.changesHandler}
//                    onKeyDown={this.keyPressHandler}
//                    value={this.state.draftsData.steady_arm.clamp_mass}/>
//         </div>
//
//         <div className={'button-group'}>
//             <button className={'cancel-btn'} onClick={() => {
//                 this.cancelModalsHandler('steady_arm')
//             }}>Cancel
//             </button>
//             <button onClick={() => {
//                 this.okayModalsHandler('steady_arm')
//             }}>OK
//             </button>
//         </div>
//
//     </div>
//
// </PantoModal>


// <PantoModal
//     visible={this.state.modal_pantograph_visible}
//     dismiss={this.cancelModalsHandler}
//     name={'pantograph'}
//     header={[
//         <h4>Pantograph</h4>,
//         <div className={'header-input-group'}>
//             <PantoSwitchButton
//                 checked={[
//                     this.state.draftsData.pantograph.moving_load_activate,
//                     () => {this.changesHandler({target: ['pantograph', 'moving_load_activate'], val: !this.state.draftsData.pantograph.moving_load_activate})}
//                 ]}
//             />
//             <div className={'input-group ' + this.state.classNameInputs.pantograph.moving_load}>
//                 <label>Moving load</label>
//                 <input
//                     name={['pantograph', 'moving_load']}
//                     onChange={this.changesHandler}
//                     onKeyDown={this.keyPressHandler}
//                     value={this.state.draftsData.pantograph.moving_load}
//                     disabled={!this.state.draftsData.pantograph.moving_load_activate}
//                 />
//             </div>
//         </div>
//     ]}
// >
//
//     <div className={'mechanical-properties-modal-body'}>
//
//
//         <div className={'model'}>
//
//             <PantographModel/>
//
//         </div>
//
//         <div className={'variables'}>
//
//
//             <div className={'variable-group'}>
//
//                 <div className={'input-group ' + this.state.classNameInputs.pantograph.m1}>
//                     <label>M1 (kg)</label>
//                     <input name={['pantograph', 'm1']}
//                            onChange={this.changesHandler}
//                            onKeyDown={this.keyPressHandler}
//                            value={this.state.draftsData.pantograph.m1}
//                            disabled={this.state.draftsData.pantograph.moving_load_activate}
//                     />
//                 </div>
//
//                 <div className={'input-group ' + this.state.classNameInputs.pantograph.c1}>
//                     <label>C1 (Ns/m)</label>
//                     <input name={['pantograph', 'c1']}
//                            onChange={this.changesHandler}
//                            onKeyDown={this.keyPressHandler}
//                            value={this.state.draftsData.pantograph.c1}
//                            disabled={this.state.draftsData.pantograph.moving_load_activate}
//                     />
//                 </div>
//
//                 <div className={'input-group ' + this.state.classNameInputs.pantograph.k1}>
//                     <label>K1 (kN/m)</label>
//                     <input name={['pantograph', 'k1']}
//                            onChange={this.changesHandler}
//                            onKeyDown={this.keyPressHandler}
//                            value={this.state.draftsData.pantograph.k1}
//                            disabled={this.state.draftsData.pantograph.moving_load_activate}
//                     />
//                 </div>
//
//             </div>
//
//             <div className={'variable-group'}>
//
//                 <div className={'input-group ' + this.state.classNameInputs.pantograph.m2}>
//                     <label>M2 (kg)</label>
//                     <input name={['pantograph', 'm2']}
//                            onChange={this.changesHandler}
//                            onKeyDown={this.keyPressHandler}
//                            value={this.state.draftsData.pantograph.m2}
//                            disabled={this.state.draftsData.pantograph.moving_load_activate}
//                     />
//                 </div>
//
//                 <div className={'input-group ' + this.state.classNameInputs.pantograph.c2}>
//                     <label>C2 (Ns/m)</label>
//                     <input name={['pantograph', 'c2']}
//                            onChange={this.changesHandler}
//                            onKeyDown={this.keyPressHandler}
//                            value={this.state.draftsData.pantograph.c2}
//                            disabled={this.state.draftsData.pantograph.moving_load_activate}
//                     />
//                 </div>
//
//                 <div className={'input-group ' + this.state.classNameInputs.pantograph.k2}>
//                     <label>K2 (kN/m)</label>
//                     <input name={['pantograph', 'k2']}
//                            onChange={this.changesHandler}
//                            onKeyDown={this.keyPressHandler}
//                            value={this.state.draftsData.pantograph.k2}
//                            disabled={this.state.draftsData.pantograph.moving_load_activate}
//                     />
//                 </div>
//
//             </div>
//
//
//             <div className={'variable-group'}>
//
//                 <div className={'input-group ' + this.state.classNameInputs.pantograph.m3}>
//                     <label>M3 (kg)</label>
//                     <input name={['pantograph', 'm3']}
//                            onChange={this.changesHandler}
//                            onKeyDown={this.keyPressHandler}
//                            value={this.state.draftsData.pantograph.m3}
//                            disabled={this.state.draftsData.pantograph.moving_load_activate}
//                     />
//                 </div>
//
//
//                 <div className={'input-group ' + this.state.classNameInputs.pantograph.c3}>
//                     <label>C3 (Ns/m)</label>
//                     <input name={['pantograph', 'c3']}
//                            onChange={this.changesHandler}
//                            onKeyDown={this.keyPressHandler}
//                            value={this.state.draftsData.pantograph.c3}
//                            disabled={this.state.draftsData.pantograph.moving_load_activate}
//                     />
//                 </div>
//
//                 <div className={'input-group ' + this.state.classNameInputs.pantograph.k3}>
//                     <label>K3 (kN/m)</label>
//                     <input name={['pantograph', 'k3']}
//                            onChange={this.changesHandler}
//                            onKeyDown={this.keyPressHandler}
//                            value={this.state.draftsData.pantograph.k3}
//                            disabled={this.state.draftsData.pantograph.moving_load_activate}
//                     />
//                 </div>
//
//             </div>
//
//
//             <div className={'variable-group'}>
//
//                 <div className={'input-group ' + this.state.classNameInputs.pantograph.uplift_force}>
//                     <label>Uplift force (N)</label>
//                     <input name={['pantograph', 'uplift_force']}
//                            onChange={this.changesHandler}
//                            onKeyDown={this.keyPressHandler}
//                            value={this.state.draftsData.pantograph.uplift_force}
//                            disabled={this.state.draftsData.pantograph.moving_load_activate}
//                     />
//                 </div>
//
//
//             </div>
//
//         </div>
//
//
//         <div className={'button'}>
//
//             <div className="load_dynamic_response_btn" onClick={()=>{this.load_dynamic_response_btn('pantograph')}}>
//                 <i className={'panto-icon ph-chart'}/>
//                 <label>Load dynamic response</label>
//             </div>
//
//
//             <div className={'button-group'}>
//                 <button className={'cancel-btn'} onClick={() => {
//                     this.cancelModalsHandler('pantograph')
//                 }}>Cancel
//                 </button>
//                 <button onClick={() => {
//                     this.okayModalsHandler('pantograph')
//                 }}>OK
//                 </button>
//             </div>
//
//         </div>
//
//     </div>
//
// </PantoModal>


// import update from "react-addons-update";
// import errors from "./errors";
// import {addNotify, removeNotify} from "../../../../components/PantoNotify";
//
// changesHandler = async (e) => {
//     let target, val;
//
//     if (Object.keys(e).length === 2) {
//         target = e.target
//         val = e.val
//
//         if (target[0] === 'messenger_wire_support' && target[1] === 'fix_status') {
//
//             let stiffnessValue, dampingValue
//             if (this.state.draftsData.messenger_wire_support.fix_status) {
//                 stiffnessValue = this.props.data.messenger_wire_support.stiffness
//                 dampingValue = this.props.data.messenger_wire_support.damping
//             } else {
//                 stiffnessValue = 1000000
//                 dampingValue = 10000
//             }
//
//             this.setState({
//                 draftsData: update(this.state.draftsData, {
//                     messenger_wire_support: {
//                         fix_status: {$set: val},
//                         stiffness: {$set: stiffnessValue},
//                         damping: {$set: dampingValue}
//                     }
//                 })
//             }, async () => {
//                 // await this.errorHandler("messenger_wire_support,stiffness", this.state.draftsData.messenger_wire_support.stiffness)
//                 // await this.errorHandler("messenger_wire_support,damping", this.state.draftsData.messenger_wire_support.damping)
//             })
//
//         } else if (target[0] === 'pantograph' && target[1] === 'moving_load_activate') {
//
//             this.setState({
//                 draftsData: update(this.state.draftsData, {
//                     pantograph: {
//                         moving_load_activate: {$set: val},
//                         m: {
//                             0: {$set: this.props.data.pantograph.m[0]},
//                             1: {$set: this.props.data.pantograph.m[1]},
//                             2: {$set: this.props.data.pantograph.m[2]}
//                         },
//                         c: {
//                             0: {$set: this.props.data.pantograph.c[0]},
//                             1: {$set: this.props.data.pantograph.c[1]},
//                             2: {$set: this.props.data.pantograph.c[2]}
//                         },
//                         k: {
//                             0: {$set: this.props.data.pantograph.k[0]},
//                             1: {$set: this.props.data.pantograph.k[1]},
//                             2: {$set: this.props.data.pantograph.k[2]}
//                         },
//                         moving_load: {$set: this.props.data.pantograph.moving_load},
//                         uplift_force: {$set: this.props.data.pantograph.uplift_force},
//                     }
//                 })
//             }, async () => {
//                 // await this.errorHandler("pantograph,m,0", this.state.draftsData.pantograph.m[0])
//                 // await this.errorHandler("pantograph,m,1", this.state.draftsData.pantograph.m[1])
//                 // await this.errorHandler("pantograph,m,2", this.state.draftsData.pantograph.m[2])
//                 // await this.errorHandler("pantograph,k,0", this.state.draftsData.pantograph.k[0])
//                 // await this.errorHandler("pantograph,k,1", this.state.draftsData.pantograph.k[1])
//                 // await this.errorHandler("pantograph,k,2", this.state.draftsData.pantograph.k[2])
//                 // await this.errorHandler("pantograph,c,0", this.state.draftsData.pantograph.c[0])
//                 // await this.errorHandler("pantograph,c,1", this.state.draftsData.pantograph.c[1])
//                 // await this.errorHandler("pantograph,c,2", this.state.draftsData.pantograph.c[2])
//                 // await this.errorHandler("pantograph,moving_load", this.state.draftsData.pantograph.moving_load)
//                 // await this.errorHandler("pantograph,uplift_force", this.state.draftsData.pantograph.uplift_force)
//             })
//
//         }
//     } else {
//         target = e.target.attributes.getNamedItem('name').value.split(",");
//         val = e.target.value;
//
//         this.setState({
//             draftsData: update(this.state.draftsData, {
//                 [target[0]]: {[target[1]]: {$set: val}}
//             })
//         })
//
//     }
// }
//
// keyPressHandler = (e)=>{
//     let keynum = e.keyCode
//     let shiftKey = e.shiftKey
//
//
//     if(!shiftKey && ((keynum > 47 && keynum < 58) || (keynum > 95 && keynum < 106) || keynum===110 || keynum===107 || keynum===109 || keynum === 8 || keynum === 9 || keynum===46 || keynum===189)) return;
//     if(keynum>=37 && keynum<=40) return;
//     if(shiftKey && (keynum===187)) return;
//     e.preventDefault();
// }
//
//
// errorHandler = async (target, val) => {
//     if(!val) val = 0
//     val = parseFloat(val)
//
//     console.info(target,val)
//
//     let hh = [];
//     let ghu = target.split(",")
//     if(ghu.length===3) hh = errors(this.state.draftsData)[ghu[0]][ghu[1]][ghu[2]];
//     else hh = errors(this.state.draftsData)[ghu[0]][ghu[1]];
//
//     target = ghu.join("_")
//
//     if (hh) {
//         if (!hh[0].v(val)) {
//             if(ghu.length===3){
//                 this.setState({classNameInputs: update(this.state.classNameInputs, {[ghu[0]]: {[ghu[1]]: {[ghu[2]]: {$set: "has-" + hh[0].y}}}})})
//             }
//             else{
//                 this.setState({classNameInputs: update(this.state.classNameInputs, {[ghu[0]]: {[ghu[1]]: {$set: "has-" + hh[0].y}}})})
//             }
//
//             await addNotify({
//                 id: target + '_' + hh[0].y,
//                 message: hh[0].t,
//                 type: hh[0].y,
//                 dismiss: {
//                     dismissible: (hh[0].y==='warning'),
//                     duration: (hh[0].y==='warning' ? 6000 : 0)
//                 }
//             })
//         }
//         else {
//             await removeNotify(target + '_' + hh[0].y)
//             if(hh[1]) {
//                 if (!hh[1].v(val)) await addNotify({
//                     id: target + '_' + hh[1].y,
//                     message: hh[1].t,
//                     type: hh[1].y,
//                     dismiss: {
//                         dismissible: (hh[1].y==='warning'),
//                         duration: (hh[1].y==='warning' ? 6000 : 0)
//                     }
//                 })
//                 else await removeNotify(target + '_' + hh[1].y)
//             }
//             if(ghu.length===3){
//                 this.setState({classNameInputs: update(this.state.classNameInputs, {[ghu[0]]: {[ghu[1]]: {[ghu[2]]: {$set: hh[1] ? "has-"+hh[1].y : ""}}}})})
//             }
//             else{
//                 this.setState({classNameInputs: update(this.state.classNameInputs, {[ghu[0]]: {[ghu[1]]: {$set: hh[1] ? "has-"+hh[1].y : ""}}})})
//             }
//         }
//     }
// }
//
//
// do_errorHandlerForCollection = async (col) => {
//     for (const _target of Object.keys(errors(this.state.draftsData)[col])) {
//         if(typeof this.state.draftsData[col][_target] === "object") {
//             for (const _index of Object.keys(errors(this.state.draftsData)[col][_target])) {
//                 await this.errorHandler(col + "," + _target + "," + _index, this.state.draftsData[col][_target][_index])
//             }
//         }
//         else{
//             await this.errorHandler(col + "," + _target, this.state.draftsData[col][_target])
//         }
//     }
// }
//
//
// okayModalsHandler = (target) => {
//
//     let ddtt = this.state.draftsData;
//
//     this.props.set_data({[target]: ddtt[target]}).then((res) => {
//         console.log(this.props.data[target])
//         if(res) this.setState({
//             draftsData: update(this.state.draftsData, {[target]: {$set: this.props.data[target]}})
//         }, ()=>{
//             this.setState({
//                 ['modal_' + target + '_visible']: false
//             })
//         });
//     })
//
// }
//
//
// cancelModalsHandler = async (target) => {
//
//     this.setState({
//         ['modal_' + target + '_visible']: false,
//         draftsData: update(this.state.draftsData, {[target]: {$set: this.props.data[target]}})
//     }, ()=>{
//         this.do_errorHandlerForCollection(target)
//     });
//
// }
//
//
// load = () => {
//
//     this.setState({
//         pantograph_color: (this.props.data.pantograph.section_status === this.SECTION_STATUS_COMPLETED ? this.validColor : this.defaultColor),
//         steady_arm_color: (this.props.data.steady_arm.section_status === this.SECTION_STATUS_COMPLETED ? this.validColor : this.defaultColor),
//         messenger_wire_support_color: (this.props.data.messenger_wire_support.section_status === this.SECTION_STATUS_COMPLETED ? this.validColor : this.defaultColor),
//         dropper_color: (this.props.data.dropper.section_status === this.SECTION_STATUS_COMPLETED ? this.validColor : this.defaultColor),
//         stitch_wire_color: (this.props.data.stitch_wire.section_status === this.SECTION_STATUS_COMPLETED ? this.validColor : this.defaultColor),
//         messenger_wire_color: (this.props.data.messenger_wire.section_status === this.SECTION_STATUS_COMPLETED ? this.validColor : this.defaultColor),
//         contact_wire_color: (this.props.data.contact_wire.section_status === this.SECTION_STATUS_COMPLETED ? this.validColor : this.defaultColor)
//     })
// }
//
//
// load_dynamic_response_btn = (w)=>{
//     addNotify({
//         id: 'load_dynamic_response_btn',
//         message: 'This feature will be added latter',
//         type: 'info',
//         dismiss: {
//             dismissible: true,
//             duration: 3000,
//         }
//     })
// }
