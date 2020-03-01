import React, { useState } from  'react'
import Spinner from '../spinner'

function Thumbnail (props)
{
    const [isLoading, setIsLoading] = useState(true)

    const handleOnLoad = () => {
        setIsLoading(false)
    }

    return (
        <div>
            <img src={props.href}
                alt="img"
                className="img"
                onLoad={handleOnLoad}
                style={isLoading ? { display: 'none' } : {display: 'block'}}
            />

            <Spinner style={isLoading ? { display: 'block' } : {display: 'none'}} />
        </div>
    )
}

export default Thumbnail