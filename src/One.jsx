// import { Component } from "react";
// class One extends Component{
//     render(){
//         return(
//             <>
//             <h1>
//                 {this.props.name}
//                 {this.props.age}
//                 </h1>
//             </>
//         )
//     }
// }
// function One({kite}){
//     return(<>
//         <h1>
//             <ul>
//             {kite.map((subject,index)=>(
//                 <li key={index}>
//                     {subject}
//                 </li>
//             ))}
//             </ul>
//             </h1>
//             </>
//     )
// }
// export default One
function One({ isLogin }) {
  return (<>
    <h1>
        <ul>
      <h1>{isLogin?"passed":"failed"}</h1>
      </ul>
    </h1>
    </>
  );
}
export default One;