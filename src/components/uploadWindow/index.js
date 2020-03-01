import React, { Component } from 'react'
import './uploadWindow.css'

class UploadWindow extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            files: []
        }

        this.handleFileUpload = this.handleFileUpload.bind(this)
    }

    handleFileUpload()
    {
        console.log("uploading the file")
    }

    render()
    {
        if (this.state.files.length <= 0)
        {
            return (
                <div className="upload_icon">
                    <form method="post" action="localhost:5000/upload" id="uploadForm" style={{display: 'inline'}}>
                        <input type="file" style={{display: 'none'}} name="uploads" id="uploads" multiple onChange={this.handleFileUpload} />
                        <label htmlFor="uploads" className="fa fa-upload" style={{fontSize: "22px", fontWeight: "200", lineHeight: "60px" }}></label>
                    </form>
                </div>
            )
        }
        return (
            <div className="uploadWindow">
                something is wrong
            </div>
        )
    }    
}

export default UploadWindow