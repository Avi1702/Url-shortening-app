import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import Link from "react-router-dom"



export const Home = () => {

    const [data2,setData2]=useState("")
    const [store,setStore]=useState([])

    const initialFetch=()=>{
        axios({
            method:"get",
            url:"http://localhost:5000"
        })
        .then((res)=>{setStore(res.data)})
        .catch((err)=>{console.log(err)})
    }
    
    const handleClick=(e)=> {
    e.preventDefault()

        axios({
          
            url: "http://localhost:5000/short",
            method: "post",
            data:{
                data:data2
            }
            
        })

        // setStore("")

    }

    useEffect(()=>{
      initialFetch()
    })
  return (
    <div>
        <h1>Url Shortening</h1>
        <div>
            <form onSubmit={(e)=>{handleClick(e)}}>
               <input type={"text"} value={data2} placeholder={'Paste the URL'} onChange={(e)=>{setData2(e.target.value)} }></input>
                <input type={"submit"}></input>
            </form>
        </div>
        <table style={{width:"60%",margin:"auto",marginTop:"100px",border:"1px solid black"}}>
            <thead >
                <tr>
                    <td>Full Url</td>
                    <td>Short Url</td>
                    {/* <td>Total clicks</td> */}

                </tr>
            </thead>
            <tbody>

                {store.map((item=>{return   <tr key={item.id}>
                    <td><a href={item.full} >{item.full}</a></td>
                    <td><a href={item.full} >{item.short}</a></td>
                    {/* <td><a href={item.clicks} >{item.clicks}</a></td> */}
                </tr>}))}
              
            </tbody>
        </table>
    </div>
  )
}
