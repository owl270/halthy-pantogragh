import React from "react"
import {Columns, DashLine, InputText, MeasuringLine, OutlineInputText, StitchWire} from "./Objects"
import * as A from "./ObjectsArrangements"

class Index extends React.Component {

    modeling_client = [980, 490]


    resize = () => {
        const client = document.getElementById("__modeling__" + this.props.id + "__");
        this.setState({
            modeling_client: [client.clientWidth, client.clientHeight]
        })
    }

    componentDidMount() {
        // this.resize();
        // window.addEventListener('resize', this.resize)
    }


    componentWillUnmount() {
        // window.removeEventListener('resize', this.resize)
    }


    render() {
        const {id, data, set} = this.props


        const $content = <>

            <Columns {...A.leftColumn}/>

            <StitchWire {...A.leftStitchWire}/>


            <DashLine {...A.leftColumnDashLine}/>
            <DashLine {...A.leftMessengerWireDashLine}/>
            <DashLine {...A.leftContactWireDashLine}/>

            <MeasuringLine {...A.leftMessengerWireHeight}/>
            <MeasuringLine {...A.leftContactWireHeight}/>


            <Columns {...A.rightColumn}/>

        </>

        const $inputs = <>
            <InputText
                value={data.ecbr_mc}
                onChange={(v) => set('ecbr_mc', v)}
                l="Messenger wire stager"
                u="cm"
                lw={125}
                x={40}
                y={0}
                w={30}
                disabled={true}
            />

            <OutlineInputText
                value={data.ecbr_mc}
                onChange={(v) => set('ecbr_mc', v)}
                u="m"
                uw={15}
                x={400}
                y={0}
                w={65}
                // disabled={true}
            />


            <InputText
                value={data.ecbr_mc}
                onChange={(v) => set('ecbr_mc', v)}
                l="Contact wire stager"
                u="cm"
                lw={125}
                x={40}
                y={25}
                w={30}
                // disabled={true}

            />

            <InputText
                value={data.ecbr_mc}
                onChange={(v) => set('ecbr_mc', v)}
                l="Tension"
                u="cm"
                lw={125}
                x={40}
                y={50}
                w={30}
                // disabled={true}
            />



            <InputText
                value={data.ecbr_mc}
                onChange={(v) => set('ecbr_mc', v)}
                l="Messenger wire stager"
                u="cm"
                lw={125}
                x={775}
                y={0}
                w={30}
                // disabled={true}
            />


            <InputText
                value={data.ecbr_mc}
                onChange={(v) => set('ecbr_mc', v)}
                l="Contact wire stager"
                u="cm"
                lw={125}
                x={775}
                y={25}
                w={30}
                // disabled={true}

            />

            <InputText
                value={data.ecbr_mc}
                onChange={(v) => set('ecbr_mc', v)}
                l="Tension"
                u="cm"
                lw={125}
                x={775}
                y={50}
                w={30}
                // disabled={true}
            />
        </>




        return <>

            <div className='modeling-body'>
                <div className="panto-row">


                    <div className="panto-col static-modeling-content-col" id={"--modeling--" + id + "--"}>
                        {$inputs}
                        <svg viewBox={A.viewBox}>{$content}</svg>
                    </div>


                    <div className="panto-col static-modeling-defect-property-col">
                        <div className="defect-property">
                            <div className="defect-property-card">
                                <span>Defect Property</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    }

}


export default Index