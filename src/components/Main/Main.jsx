import React, { useContext, useState, useRef, useEffect } from 'react'
import profile from '../../assets/ezio.jpg'
import geminiLogo from '../../assets/gemini-color.png'
import {
    MessageSquare, Lightbulb, CodeXml, Compass,
    ImagePlus, Mic, SendHorizontal
} from 'lucide-react';
import { Context } from '../../context/Context';

function Main({ recentInputFromSideBar, isNewChat }) {

    const {
        onSent, input, setInput,
        recentPrompt, showResult, setShowResult,
        loading, resultData
    } = useContext(Context);

    const [displayIndex, setDisplayIndex] = useState("");
    const [typingIndex, setTypingIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(false);
    const textareaRef = useRef(null);


    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    useEffect(() => {
        if (!loading && resultData) {
            setDisplayIndex("");      // Reset typed output
            setTypingIndex(0);         // Start at the beginning
        }
    }, [resultData, loading])

    useEffect(() => {
        if (typingIndex < resultData.length && !loading) {
            const timeout = setTimeout(() => {
                setDisplayIndex(prev => prev + resultData[typingIndex]);
                setTypingIndex(prev => prev + 1);
            }, 10); // Typing speed (ms per character)
            return () => clearTimeout(timeout);
        }
    }, [typingIndex, resultData, loading])


    const changeState = (e) => {
        setIsTyping(Boolean(e.target.value.trim()));
    };

    const handleSend = () => {
        if (input.trim() !== '') {
            onSent(input, true);
        }
    };
    useEffect(() => {
        if (recentInputFromSideBar) {
            setInput(recentInputFromSideBar)
            onSent(recentInputFromSideBar, false);
        }
    }, [recentInputFromSideBar]);
    useEffect(() => {
        if (isNewChat) {
            setShowResult(prev => !prev)
        }
    }, [isNewChat])



    return (
        <div className="flex-1 min-h-screen pb-[17vh] relative bg-white">
            <div className="flex items-center justify-between text-[22px] p-5 text-gray-700 sticky top-0 bg-white">
                <p className="font-semibold">Gemini</p>
                <img src={profile} alt="profile" className="rounded-full w-10 cursor-pointer" />
            </div>

            <div className="max-w-[900px] mx-auto px-4 overflow-auto">
                {!showResult ? (
                    <div className="mb-12">
                        <div className="my-15 text-4xl sm:text-5xl text-[#c4c7c5] font-bold">
                            <p>
                                <span className="bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
                                    Hello, Jozef.
                                </span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <Compass className="pCard" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <Lightbulb className="pCard" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <MessageSquare className="pCard" />
                            </div>
                            <div className="card">
                                <p>Tell me about React JS and React Native</p>
                                <CodeXml className="pCard" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 space-y-8 overflow-y-auto scrollbar-hide max-h-[70vh]">
                        <div className="flex gap-4 w-full">
                            <img src={profile} className="rounded-full w-10 h-10" alt="User" />
                            <p className="whitespace-normal break-words">{recentPrompt}</p>
                        </div>

                        <div className="flex gap-4">
                            <img src={geminiLogo} className="rounded-full w-10 h-10" alt="Gemini" />
                            {!loading ? (
                                <p className="whitespace-pre-wrap break-words text-gray-800" dangerouslySetInnerHTML={{ __html: displayIndex }} />
                            ) : (
                                <div className="space-y-3 w-full max-w-[700px]">
                                    <div className="h-5 shimmer"></div>
                                    <div className="h-5 shimmer"></div>
                                    <div className="h-5 shimmer"></div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute lg:left-1/2 lg:-translate-x-1/2 bottom-4 w-full max-w-[900px] px-4 sm:px-6 md:px-8 mx-auto">
                <div className="relative">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        placeholder="Enter a prompt here"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            changeState(e);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        className="w-full resize-none overflow-hidden text-[16px] font-medium outline-none border-0 bg-[#f0f4f9] px-5 py-4 rounded-3xl pr-20 leading-tight"
                    ></textarea>

                    <div className="flex items-center gap-3 absolute bottom-[35%] right-5 text-[#585858]">
                        <ImagePlus className="cursor-pointer" />
                        <Mic className="cursor-pointer" />
                        {isTyping && <SendHorizontal onClick={handleSend} className="cursor-pointer" />}
                    </div>
                </div>
                <div className="text-[13px] mt-2 text-center font-light text-gray-500">
                    Gemini may display inaccurate info, including about people, so double-check its responses.
                </div>
            </div>
        </div>
    );
}

export default Main;
