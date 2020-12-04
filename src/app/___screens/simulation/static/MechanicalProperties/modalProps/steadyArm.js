import React from "react";
import Index from "../../../../../components/PantoSwitchButton";

export default {
    visible: true,
    dismiss: ()=>{},
    name: 'steady_arm',
    header: [
        <h4>Pantograph</h4>,
        // <div className={'header-input-group'}>
        //     <PantoSwitchButton
        //         checked={[
        //             this.state.draftsData.pantograph.moving_load_activate,
        //             () => {this.changesHandler({target: ['pantograph', 'moving_load_activate'], val: !this.state.draftsData.pantograph.moving_load_activate})}
        //         ]}
        //     />
        //     <div className={'input-group ' + this.state.classNameInputs.pantograph.moving_load}>
        //         <label>Moving load</label>
        //         <input
        //             name={['pantograph', 'moving_load']}
        //             onChange={this.changesHandler}
        //             onKeyDown={this.keyPressHandler}
        //             value={this.state.draftsData.pantograph.moving_load}
        //             disabled={!this.state.draftsData.pantograph.moving_load_activate}
        //         />
        //     </div>
        // </div>
    ],
    children: <h1>Rasoul</h1>
}