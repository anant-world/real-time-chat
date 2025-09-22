import React,{useState,useEffect,useRef} from 'react'

function CreateGroup() {
    const [admin,setAdmin]=useState("")
    const [username,setUsername]=useState("")

    const handleSubmit=()=>{}

  return (
    <div>
      <div>
        <input type="text" value={admin} onChange={(e)=>{setAdmin(e.target.value)}} />
        <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        <div>
            <button onSubmit={}>submit</button>
        </div>
      </div>
    </div>
  )
}

export default CreateGroup
