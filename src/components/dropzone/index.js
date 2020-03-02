import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './dropzone.css'

function Dropzone(props)
{
    var [error, setError] = useState("")

    const printError = () => {
            return <i style={{color: "red", marginBottom: "10px", fontWeight: "bold", fontSize: "22px"}}>{error}</i>
    }

    const closeWindow = () => {
        // close window
        console.log("closing window")
    }

    const onDrop = useCallback(acceptedFiles => {
        // upload the files
        acceptedFiles.forEach(file => {
            let filename = file.name;
            let file_ext = filename.split('.').pop()
            if (file_ext !== "png" && file_ext !== "jpg" && filename !== "jpeg")
                setError("you can only upload pngs and jpegs")
            else
                console.log("valid file")
        });
    })
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return(
        <div className="dropzone">
            <div className="dropbox" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            {printError()}
        </div>
    )
}

export default Dropzone