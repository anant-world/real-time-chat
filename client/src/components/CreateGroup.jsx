import React,{useState} from 'react'
import { groupApi } from '../api/group'
import { useNavigate } from 'react-router-dom'

function CreateGroup() {
    const [username,setUsername]=useState("")
    const [groupName, setGroupName] = useState("")
  const nav = useNavigate()
    const handleSubmit = () => {
      const res = groupApi.createGroup(groupName, username)
      console.log("res -> ", res)
      if(res.data.success) {
        nav(`/groupchat/${groupName}`)
      }else {
        alert("Cannot create the group")
        console.log("error -> ", res.data)
      }
    }

  return (
    <div>
      <div>
        <input type="text" value={groupName} onChange={(e)=>{setGroupName(e.target.value)}} />
        <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        <div>
            <button onSubmit={handleSubmit}>submit</button>
        </div>
      </div>
    </div>
  )
}

export default CreateGroup
