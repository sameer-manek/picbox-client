import React from  'react'

function Thumbnail (props)
{
    return (
        <img src={props.href} alt="img" className="img" />
    )
}

export default Thumbnail