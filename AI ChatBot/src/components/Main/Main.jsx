import React, { useContext } from 'react'
import './Main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'
const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)

    //to send the prompt by pressing enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input) {
          onSent();
        }
    };
      // function to handle card click
    const handleCardClick = (prompt) => {
        setInput(prompt);
        onSent(prompt);
    };

  return (
    <div className='main'>
        <div className="nav">
            <p>AI ChatBot</p>
            <img src={assets.user_icon} alt="" />
        </div>
        
        <div className="main-container">

            {!showResult
            ?<>
            <div className="greet">
                <p><span>Hello, User.</span></p>
                <p>How can I help you ?</p>
            </div>
            <div className="cards">
                <div className="card" onClick={() => handleCardClick('Suggest beautiful places to see on an upcoming trip to Turkey.')}>
                    <p>Suggest beautiful places to see on an upcoming trip to Turkey.</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card" onClick={() => handleCardClick('Briefly summarize the four pillars of Object Oriented Programming.')}>
                    <p>Briefly summarize the four pillars of Object Oriented Programming.</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card" onClick={() => handleCardClick('Suggest team bonding activities for our work retreat.')}>
                    <p>Suggest team bonding activities for our work retreat.</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card" onClick={() => handleCardClick('What is the full form of PDF ?')}>
                    <p>What is the full form of PDF ?</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            :<div className='result'>    
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                    
                </div>
            </div>
            }

            
            <div className="main-bottom">
                <div className="search-box">
                {/* onChange event handler updates the input state with the 
                current value of the input field whenever the user types  */}
                <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder='Enter a prompt here'
            />
                    <div>
                        {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">
                AI ChatBot can make mistakes. Check important info.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main
