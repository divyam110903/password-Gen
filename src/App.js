import React, { useEffect } from "react"
import { useState, useCallback, useRef } from "react"

export default function App() {
  const [length, setlength]=useState(8);
  const [numberAllowed,setNA]=useState(false);
  const [charAllowed,setCA]=useState(false);
  const [pwd, setPWD]=useState("")

  //USEREF
  const passwordRef= useRef(null);

  const pwd_gen= useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num="0123456789";
    if (numberAllowed) str+=num;
    if (charAllowed) str+="!@#$%^&*()_+";

    for(let i=1;i<=length;i++){
      let char= Math.floor(Math.random()*str.length +1);
      pass +=str.charAt(char);
    }

    setPWD(pass);

  },[length, numberAllowed, charAllowed,setPWD])



  const copytoclipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,22);

    window.navigator.clipboard.writeText(pwd);
    //alert("copied to clipboard");
  },[pwd])

  useEffect( ()=>{
    pwd_gen();
  }, [length, numberAllowed, charAllowed, pwd_gen ])



  return (
   <>
  <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  my-8 text-orange-400 bg-gray-500 '>
    <h1 className='text-white text-center mb-2 '>Password Generator</h1>

    <div className="flex shadow rounded-lg overflow-hidden mb-4"> 

<input type="text"
value={pwd}
className="='outline-none w-full py-1 px-3"
placeholder='password'
readonly
ref={passwordRef}

/>
<button 
onClick={copytoclipboard}
className="outline-nonr bg-blue-600 text-white px-3 py-0.5 shrink-0">copy</button>

    </div>

    <div className="flex text-sm gap-x-1">
      <div className="flex items-center gap-x-1">

        <input type="range" min={6} max={55}
        value={length} className="cursor-pointer"
        onChange={(e)=>{
          setlength(e.target.value)
        }}
        />
<label>Length: {length}</label>
      </div>
 

  <div className="flex items-center gap-x-1">
    <input 
    type="checkbox"
    defaultChecked={numberAllowed}
    id="numberInput"
    onChange={()=>{
      setNA((prev)=>!prev);
    }}
    />
    <label htmlFor="numberInput">Numbers </label>


    
  </div>

  <div className="flex items-center gap-x-1">
    <input 
    type="checkbox"
    defaultChecked={charAllowed}
    id="characterInput"
    onChange={()=>{
      setCA((prev)=>!prev);
    }}
    />
    <label htmlFor="characterInput">Characters </label>

    
    
  </div>





  </div>
  </div>
   </>
  )
}

