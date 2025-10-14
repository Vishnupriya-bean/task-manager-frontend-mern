import React from 'react';

function AuthLayout({ children }) {
  return (
    <div className='bg-[url("https://res.cloudinary.com/dzpcirnqq/image/upload/v1755964377/Screenshot_2025-08-23_212149_dqzkdw.png")] 
                    md:bg-[url("https://res.cloudinary.com/dzpcirnqq/image/upload/v1760347817/wmremove-transformed_fohxnu.jpg")] 
                    md:flex min-h-screen items-center justify-center bg-cover bg-no-repeat bg-center overflow-y-auto p-8'>
      
      <div className='w-full md:w-[60vw] md:mr-[600px] px-12 pt-8 pb-12'>
        <h2 className='text-3xl text-black font-medium mb-15'>Task Manager</h2>
        {children}
      </div>

      
      {/* <div className='hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 bg-cover bg-no-repeat bg-center p-8'>
        <img 
          src="https://res.cloudinary.com/dzpcirnqq/image/upload/v1757757972/ChatGPT_Image_Sep_13_2025_03_35_12_PM_aiwylk.png" 
          className='w-64 lg:w-[90%]' 
        />
      </div> */}
    </div>
  );
}

export default AuthLayout;
