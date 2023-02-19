import { useState } from "react";
import { Channel } from "../lib/Channel";
import "./box.css";
function A() {
    // const [count, setCount] = useState(0)
    const [message, setMessage] = useState('msg');

    function handleChange(event:any) {
        setMessage(event.target.value)
    }

  function sendMsg( msg:any){
    Channel.use('test').publish(message)
  }

    return (
      <div className="boxWarp">
        A {message  }
        <input
         onChange={handleChange}
         type="text" placeholder="type msg"/>
        <button  onClick={sendMsg}>send</button>
      </div>
    )
  }
  
  export default A