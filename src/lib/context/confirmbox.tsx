'use client'
import React, { useState, useContext, createContext } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmBoxProps {
    text: string;
    action: () => void;
    actionName: string;
}

interface ConfirmBoxContextProps {
    showConfirmBox: (props: ConfirmBoxProps) => void;
    hideConfirmBox: () => void;
}

const ConfirmBoxContext = createContext<ConfirmBoxContextProps | undefined>(undefined);

export const ConfirmBoxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [confirmBoxProps, setConfirmBoxProps] = useState<ConfirmBoxProps | null>(null);

    const showConfirmBox = (props: ConfirmBoxProps) => setConfirmBoxProps(props);
    const hideConfirmBox = () => setConfirmBoxProps(null);

    return (
        <ConfirmBoxContext.Provider value={{ showConfirmBox, hideConfirmBox }}>
            {children}
            {confirmBoxProps && createPortal(
                <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] inset-0 z-[9999999999999999999999999] flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white pt-5 rounded shadow-lg">
                        <p className='px-3 py-3 text-lg'>Confirm action</p>
                        <hr />
                        <p dangerouslySetInnerHTML={{ __html: confirmBoxProps.text }} className="mb-4 p-5 text-center border-black border-t-[0.5px]"></p>
                        <hr />
                        <div style={{ paddingRight: '20px' }} className="flex justify-end py-3 space-x-4 ">
                            <button
                                onClick={hideConfirmBox}
                                className="px-4 py-2 bg-[#1C2435] text-white rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                style={{ backgroundColor: 'red', marginLeft:'15px' }}
                                className="px-4 py-2 ml-2 bg-red text-white rounded"
                                onClick={() => {
                                    confirmBoxProps.action();
                                    hideConfirmBox();
                                }}
                            >
                                {confirmBoxProps.actionName}
                            </button>

                        </div>
                    </div>
                </div>,
                document.body
            )}
        </ConfirmBoxContext.Provider>
    );
};

export const useConfirmBox = (): ConfirmBoxContextProps => {
    const context = useContext(ConfirmBoxContext);
    if (!context) {
        throw new Error('useConfirmBox must be used within a ConfirmBoxProvider');
    }
    return context;
};
