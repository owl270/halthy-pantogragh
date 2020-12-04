import React from "react";
import PantoButton from "../../../components/PantoButton";
import htmlToImage from "html-to-image";


import useScreenRecording from "use-screen-recording";

// function App() {
//     const { isRecording, recording, toggleRecording } = useScreenRecording();
//
//     return (
//         <div>
//             <button onClick={toggleRecording}>
//                 {isRecording ? "Stop" : "Start Recording"}
//             </button>
//
//             {!!recording && (
//                 <video autoPlay src={recording && URL.createObjectURL(recording)} />
//             )}
//         </div>
//     );
// }


class Index extends React.Component {


    render() {


        return (
            <PantoButton
                onClick={() => {
                    htmlToImage.toCanvas(document.getElementById("supervision-container"))
                        .then(function (canvas) {
                            document.body.appendChild(canvas);
                        })
                        .catch(function (error) {
                            console.error('oops, something went wrong!', error);
                        });
                }}
            >
                Record & Save result
            </PantoButton>
        )

    }


}


export default Index