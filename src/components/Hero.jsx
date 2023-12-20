import React from 'react';
import {logo} from '../assets'
const Hero = () => {
    return (
        <header className='w-full flex flex-col justify-center items-center'>
            <nav className=' flex justify-between items-center flex-row w-full p-3 mb-10'>
                <img className=' w-28 object-contain' src={logo} alt='Sumz_logo'/>
                <button type='button' onClick={() => {window.open('https://github.com/kautilya101')}} className=' black_btn'>Github</button>
            </nav>
            <h1 className='head_text'>
                Summarize text with <br/>
                <span className='orange_gradient'>OpenAI GPT-4</span>
            </h1>
            <h2 className=' mt-5 text-lg text-gray sm:text-xl text-center max-w-2xl '>
            Brings you the clear and concise summaries of the lengthy article, using an open-source article summarizer
            </h2>
        </header>
    );
}

export default Hero;
