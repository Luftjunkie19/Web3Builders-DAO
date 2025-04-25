'use client';

import React, { useCallback, useState } from 'react'

type Props = {}

function useHandleSidebarState({}: Props) {
 const [isOpen, setIsOpen] = useState<boolean>(false);
 
  const toggleState= useCallback(async ()=>{
   
     setIsOpen(!isOpen);
     
  },[isOpen]);


    return {isOpen, toggleState}
}

export default useHandleSidebarState