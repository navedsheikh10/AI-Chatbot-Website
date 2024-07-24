import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    //to save the input data in the input prompt
    const [input,setInput] = useState("");
    //on clicking the send button the input field data will be saved in recentprompt
    const [recentPrompt,setRecentPrompt] = useState("");
    //to save all the input history and display it in the recent tab
    const [previousPrompts,setPreviousPrompts] = useState([]);
    //once the showresult gets true the main component which has Hello User and the 
    //divs of suggestions will disappear and result will be shown 
    const [showResult,setShowResult] = useState(false);
    //when laoding==true laoding animation will be shown and it'll turn back to false 
    //once the loading is done 
    const [loading,setLoading] = useState(false);
    //to display the result on the webpage
    const [resultData,setresultData] = useState("");

    const delayPara = (index,nextWord) => {
        setTimeout(() => {
            setresultData(prev=>prev+nextWord);
        }, 75*index);
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }
    const onSent = async(prompt) => {

        setresultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await run(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPreviousPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
         if(response[0]=='#')
            response = response.substring(3);
        let responseArray = response.split("**")
        let newResponse = "" ;
        for(let i=0; i < responseArray.length; i++)
        {
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setLoading(false)
        setInput("")

    }



    const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }
    return (
        <Context.Provider value = {contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
