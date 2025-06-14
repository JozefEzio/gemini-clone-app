import { createContext, useState } from "react";
import main from "../config/gemini";

// Create the context
export const Context = createContext();

// Create the provider component
const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // Main function to send a prompt to Gemini
    const onSent = async (prompt, isInput) => {
        if (!prompt?.trim()) return; // Prevent empty submissions

        try {
            setLoading(true);
            setShowResult(true);
            setResultData("");
            setRecentPrompt(prompt);            // Save current prompt

            const response = await main(prompt); // Call Gemini API
            const newArray = response.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            // let responseArray=response.split('**');
            // let newArray;
            // for (let i = 0; i < responseArray.length; i++) {
            //     if(i===0||i%2!==1){
            //         newArray+=responseArray[i];
            //     }else{
            //         newArray+="<b>"+responseArray[i]+"</b>"
            //     }
                
            // }
            const newArray2=newArray.split('*').join(' ')
            setResultData(newArray2);            // Save response
            setRecentPrompt(prompt);            // Save current prompt
            isInput?setPrevPrompts((prev) => [...prev, prompt]):null // Add to history
            setInput("");                       // Clear input
            setLoading(false);                  // Stop loading spinner
        } catch (error) {
            console.error("Failed to fetch from Gemini:", error);
            setLoading(false);
        }
    };

    // Provide all state and actions to children
    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
