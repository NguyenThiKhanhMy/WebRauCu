import React from 'react'
import loading from "assets/gif/loading.gif"

interface Props {}

const Loading = (props: Props) => {  

    return (
        <div className="Cloading">
           <img src={loading} alt='Loading...'/>
        </div>    
    )
}

export default Loading;