// import Devtool from "@channel-x/devtools/src/lib/Devtool.vue";
import { useState } from 'react';
import './App.css';
import A from './components/A';
import B from './components/B';

// import "./remote-devtool.t.ts"
// const Devtool=React.lazy(() => import('remote_app/Devtool'))
//  console.log(Devtool)
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <A/>
      <B/>
    </div>
  )
}

export default App
