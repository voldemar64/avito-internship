import "./Preloader.css";
import React from 'react'

function Preloader({ addMovies }) {
    return (
        <div className='preloader'>
            <button
                className='preloader__button'
                onClick={addMovies}>
                Ещё
            </button>
        </div>
    )
}

export default Preloader;