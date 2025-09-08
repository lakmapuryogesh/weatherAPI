import React, { type PropsWithChildren } from 'react'
import Header from './Header'
const layout = ({children}:PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from-background to-muted'>
     <Header /> 
     <main className='min-h-screen container mx-auto px-4 py-8'>{children}</main> 
     <footer className='border-t backdrop-blur  py-12 supports-[backdroup-filter]:bg-background/60'>
        <div className='container max-auto px-4   text-center text-gray-400'>
            <p>Made by LakmapuYogesh</p>
        </div>
     </footer>
    </div>
  )
}

export default layout
