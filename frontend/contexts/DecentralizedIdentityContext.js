import React, { useContext, createContext, useState, useEffect } from 'react';

const DecentralizedIdentityContext = createContext();

const DecentralizecdIdentityProvider = ({children}) => {
    const [did, setDID] = setState("")

    useEffect(() => {
    })

    return ( 
        <DecentralizedIdentityContext.Provider>
            {children}
        </DecentralizedIdentityContext.Provider>
    )
}