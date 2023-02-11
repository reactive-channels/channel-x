import { useEffect, useState } from "react";
import { Channel } from "../lib/Channel";
import "./box.css";
function B() {

    useEffect(()=>{
        Channel.use('test').consume(x=>{
            console.log("x",x)
            handleChange(x)
        })
    })
 

    // const [count, setCount] = useState(0)
    const [message, setMessage] = useState('msg');

  const handleChange = (event:any) => {
    // 👇 Get input value from "event"
    setMessage(event);
  };


    return (
      <div className="boxWarp">
        B {message}
        <input type="text" placeholder="type msg"/>
      </div>
    )
  }
  
  export default B