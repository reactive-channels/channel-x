import { applyVueInReact } from 'veaury';
// This is a Vue component
import Devtool from "@channel-x/devtools/src/lib/Devtool.vue";
import { useState } from 'react';
import '../index.css';
// Use HOC 'applyVueInReact'
const Basic = applyVueInReact(Devtool)
export default function () {
  const [foo] = useState('Hello!')
  return <Basic foo={foo}  >
    <div>
      the default slot
    </div>
  </Basic>
}