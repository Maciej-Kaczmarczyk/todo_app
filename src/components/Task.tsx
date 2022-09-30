import React, { useEffect, useState } from "react";

const Task = (props: { tasks: any }) => {
  const tasks = props.tasks;
  const steps = tasks.steps



const [status, setStatus] = useState(steps.map((e: { checked: any; }) => e.checked))

const stepsDone = ((status.filter((i: boolean) => i === true).length / status.length)*100).toFixed(0)

let progressColor: string = ""

if(parseFloat(stepsDone) <= 33){
  progressColor = "text-red-400"
}
if(parseFloat(stepsDone) > 33 && parseFloat(stepsDone) < 66){
  progressColor = "text-orange-400"
}
if(parseFloat(stepsDone) >= 66){
  progressColor = "text-green-400"
}



  return (
    <div
      className="collapse collapse-arrow bg-white rounded-xl my-2"
    >
      <input type="checkbox" />
      <div className="flex items-center gap-3 collapse-title text-xl font-medium">
        <div
          // className="radial-progress text-green-400"
          className={"radial-progress " + progressColor}
          style={
            {
              "--value": stepsDone,
              "--size": "2.6rem",
              "--thickness": "4px",
            } as React.CSSProperties
          }
        >
          <p className="text-xs font-normal text-black">{stepsDone}%</p>
        </div>
        <div>
          <h2>{tasks.title}</h2>
          <div className="flex gap-3">
            <p className="text-xs font-normal">
              Time left:{" "}
              <span className="text-green-400 font-semibold">2d</span>
            </p>
            <p className="text-xs font-normal">
              Importance:{" "}
              <span className="text-red-400 font-semibold text-xs">High</span>
            </p>
          </div>
        </div>
      </div>
      <div className="collapse-content">
        <div className="flex-col ml-8">
          <div className="flex-col items-center gap-2 mt-2">

        
          {steps.map((task: any) => {
            

            return(
             <div className="flex items-center gap-2" key={task.text}>
               <input
               onChange={() => {
                 task.checked = !task.checked;
                 setStatus(steps.map((e: { checked: any; }) => e.checked));
                
                 
               }}
               type="checkbox"
               className="checkbox-xs"
             />
             <p className="text-sm">{task.text}</p>
             </div>
          )})}
          
           

          </div>
        </div>
        <button
          disabled={parseFloat(stepsDone) === 100? false: true}
          className="btn btn-sm btn-block mt-5 bg-blue-600 hover:bg-blue-800 border-none"
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default Task;
