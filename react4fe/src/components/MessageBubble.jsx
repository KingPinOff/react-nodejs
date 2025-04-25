
export default function MsgBubble({type,content,from}){
    if(type==="alert")
    {
        return <div className="chatlayout"><div className="msg alert">{content}</div></div>
    }
    const direction = type==="sent"?"sent":"recieved"
   return (
   <>
   <div className={`chatLayout ${direction}`}>

   <div className="fakepfp">
    {from?from.slice(0,2).toUpperCase():"?"}
   </div>
   <div className="msg">
       {content}
    </div>
   </div>
   </>
   )

}