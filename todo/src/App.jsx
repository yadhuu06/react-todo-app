import React ,{useState
}from 'react'
export default function myfun(){
  var [a,b]=useState(0)
  return (
  <>
 <div className="inp"> <div className="sub" onClick={()=>{b(a+1)}}><button></button></div></div>
  </>);
}
