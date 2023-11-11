/* eslint-disable no-unused-vars */
import { useState } from "react";
import TopBar from "./AddTodo";
import AddTodo from "./AddTodo";
import Update from "./Update";

// eslint-disable-next-line react/prop-types
export default function MainBar() {
  const data = [
    {
      name: "Office Task-1",
      Description: "This is the description for my first Task",
      status: "Not-Completed",
    },

    {
        name: "Office Task-2",
        Description: "This is the description for my second Task",
        status: "Completed",
      },
      {
        name: "Office Task-3",
        Description: "This is the description for my Third Task",
        status: "Not-Completed",
      }
  ];
  const [myData, setMyData] = useState(data);
  const [showData,setShowData] = useState(true);
 const [editId,setEditId]=useState("");
 const[status,setStatus]=useState("");
 
 //delete function
   const deleteTodoDetails=(id)=>{
     const remainingDoctors=myData.filter((docInfo,idx)=> idx !== id); 
     setMyData(remainingDoctors);
   };
 
   //update function
   const handleEdit =(id)=>{
 setShowData(false);
 setEditId(id);
   };
   //handle Status
   const handleStatus = (e) => {
    const selectedStatus = e.target.value;
  
    if (selectedStatus === "All") {
      // Show all todos
      setMyData(data);
    } else {
      // Filter todos based on the selected status
      const filteredData = data.filter((item) => item.status === selectedStatus);
      setMyData(filteredData);
    }
  };
  return (
    <div className="main">
      {showData===true ?
        <AddTodo myData={myData} setMyData={setMyData} />:
       <Update myData={myData}
        setMyData={setMyData} 
        showData={showData}
        setShowData={setShowData}
        editId={editId}
        />
      }
      { (
        <>
        <div className="flex justify-between text-xlfont-bold m-4 text-xl font-bold">
        <div>My Todos</div>
        <div>Status Filter
              <span> 
                  <select className="select text-white select-sm w-30 bg-red-400 "
        onChange={(e)=>handleStatus(e)} value={status} >
              <option value="All" >All</option>
              <option value="Completed">Completed</option>
              <option value="Not-Completed">Not-Completed</option>
             
                </select>
              </span>
        </div>
        </div>
      
        <div className="flex flex-wrap m-2 p-1">
        {myData.map((docInfo, idx) => (
            <div
              key={idx}
              className="card w-82 bg-green-200 m-1 tracking-tight p-1 font-medium "
            >
              <div className="card-body">
                <p> Name:{docInfo.name} </p>
                <p>Description:{docInfo.Description}</p>
                <p className="">Status 
                <select className={`select select-bordered text-white select-sm w-30 pl-3 m-1  ${docInfo.status == "Not-Completed" ?'bg-red-400':'btn-success'}`}>
                  {docInfo.status == "Completed"? (
                    <option >Completed</option>
                  ) : (
                    <option >Not-Completed</option>
                  )}
                  {docInfo.status == "Not-Completed" ? (
                    <option >Completed</option>
                  ) : (
                    <option >Not-Completed</option>
                  )}
                </select>
                </p>
                
                <div className="card-actions justify-end">
                  <button className="btn btn-success text-white" 
                  onClick={()=>handleEdit(idx)}>Edit</button>
                  <button className="btn bg-orange-600 text-white"
                  onClick={()=>deleteTodoDetails(idx)}
                  >Delete</button>
                 

                </div>
              </div>
            </div>
          ))}
        </div>
          
        </>
      )}
    </div>
  );
}
