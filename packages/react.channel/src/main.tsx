import ReactDOM from 'react-dom/client'
import App from './App'
import Devtools from './devtools/Devtools'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div>
    <App />
    <Devtools/>
  </div>,
)
