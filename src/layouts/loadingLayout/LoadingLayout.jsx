import React from 'react';
import Loader from '../../components/loader/Loader';

const LoadingLayout = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Loader/>
        </div>
    );
};

export default LoadingLayout;