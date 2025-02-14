import "./Preloader.css";
import React from 'react'

function Preloader({ addPosts }) {
    return (
        <div className='preloader'>
            <button
                className='preloader__button'
                onClick={addPosts}>
                Ещё
            </button>
        </div>
    )
}

export default Preloader;