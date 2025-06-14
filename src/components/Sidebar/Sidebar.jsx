import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';

function Sidebar({ setRecentInputFromSideBar, setIsNewChat }) {
    const [isExtended, setIsExtended] = useState(false);
    const { prevPrompts } = useContext(Context);

    const changeState = () => setIsExtended(prev => !prev);

    return (
        <div className="min-h-screen max-w-xs md:max-w-sm inline-flex flex-col justify-between bg-gray-100 p-6">
            <div>
                <i
                    className="fa-solid fa-bars cursor-pointer text-xl ml-2 text-gray-800"
                    onClick={changeState}
                ></i>

                <div onClick={() => { setIsNewChat(prev => !prev); changeState() }} className="mt-12 flex items-center gap-2 rounded-2xl p-3 bg-gray-200 text-gray-600 cursor-pointer hover:bg-gray-300 transition duration-300">
                    <i className="fa-solid fa-plus text-2xl"></i>
                    {isExtended && <p>New Chat</p>}
                </div>

                {isExtended && (
                    <div className="mt-6">
                        <p className="text-base text-gray-700 ml-1">Recent</p>
                        <div className="flex flex-col my-4">
                            {prevPrompts.map((prompt, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setRecentInputFromSideBar(prompt);
                                        changeState();
                                    }}
                                    className="flex items-center gap-2 mt-2 rounded-2xl p-2 cursor-pointer hover:bg-gray-200 transition duration-300"
                                >
                                    <i className="fa-solid fa-message text-gray-600"></i>
                                    <p>{prompt.length > 20 ? prompt.slice(0, 20) + '...' : prompt}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4">
                {['Help', 'Activity', 'Settings'].map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2 rounded-2xl px-3 py-2 cursor-pointer hover:bg-gray-200 transition duration-300"
                    >
                        <i className={`fa-solid ${item === 'Help' ? 'fa-circle-question' : item === 'Activity' ? 'fa-clock-rotate-left' : 'fa-gear'} text-gray-600`}></i>
                        {isExtended && <p>{item}</p>}
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Sidebar;
