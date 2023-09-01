import { useState, useEffect , useRef} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';



export default function Page2(){
    const query =(window.location.search)
    console.log(query.slice(3))

    //const [val ,setval] = useState('')
    const textval = useRef(null)

    function handleClick(){
    textval.current.select();
    const text = textval.current.value
    //console.log(text)
    if(text.length < 1){
        alert("The Input Box is Empty")
      }
      else{
        
        document.execCommand('copy');
        alert(`The copied text is ${text}`)
        
      }
    }
   
   
    
    
    return(
        <>
        <div className='spacebox1'>

        </div>
        <div className='p2head'>
        <h4 >Zolve Task</h4>
        </div>
        <div className='task2image'>
            <img  className='task2-image' src="https://substackcdn.com/image/fetch/w_1166,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Fhome_page%2Fhero_image.png" alt="ps4image" />
        </div>
        <div className='spacebox1'>

        </div>
        <div className='textbox' >
            <input type="text" ref={textval}  placeholder='Type something... '  defaultValue={window.location.search.slice(3,)}  className='textfield'/>
            <button className='buttonfield' onClick={handleClick}>Copy to clipboard</button>
        </div>
        <div className='spacebox1'>

        </div>
        <div>
            <h4 className='readtext'>To perform copy-query-to-clipboard, type in this format (: http://localhost:3000?q=text you want)</h4>
        </div>
       
        </>
    )
}