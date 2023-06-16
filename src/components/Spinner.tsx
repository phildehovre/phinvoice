import React from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './Spinner.scss'
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

function Spinner(props: {
    sizeProp?: SizeProp | undefined
}) {

    const { sizeProp } = props

    return (
        <div className='spinner-ctn'>
            <FontAwesomeIcon id='spinner' size={sizeProp} icon={faSpinner} />
        </div>
    )
}

export default Spinner