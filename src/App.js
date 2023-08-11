import "./App.css";
import data from "./data";
import { useState, useRef, useEffect } from "react";

export default function App() {
  const eCount = useRef(data.length);
  const [activeTab, setActiveTab] = useState("list-of-employees");
  const [listOfEmployees, setListOfEmployees] = useState(data);
  const [newE, setNewE] = useState({
    id: eCount.current + 1,
    name: "",
    surname: "",
    level: "junior",
  });
  const [levelE, setLevelE] = useState({
    junior: 0,
    senior: 0,
  });
  

  const updateLevel = () => {
    const newValue = {
      junior: 0,
      senior: 0,
    };
    listOfEmployees.map((oneE) => {
      if (oneE.level === "junior") {
        newValue.junior += 1;
      } else {
        newValue.senior += 1;
      }
      return newValue;
    });

    setLevelE(newValue);
  };
  
const [valid, setValid] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    // if (e.target.level===false) 
    const updateE = { ...newE, [e.target.name]: e.target.value };
    
    
    console.log(updateE);
    
      
    setNewE(updateE);
    validateData2(updateE);
    console.log(e.target.checked)
  };

  const [valid2, setValid2] = useState(false);
  const validateData2 = (newE) => {
    console.log(newE);
    if(newE.name.trim().length>0 && newE.surname.trim().length>0){    
    setValid2(true);
  }else{
  setValid2(false);
}
  
  }; 


  const handleAdd = () => {
    setListOfEmployees((listOfEmployees) => {
      return [...listOfEmployees, newE];
    });    
    eCount.current++;
    const updateE = {
      id: eCount.current + 1,
      name: "",
      surname: "",
      level: "",
    };
    setNewE(updateE);
    
  };
  const handleDelete = (idToDel) => {
    setListOfEmployees(listOfEmployees.filter((oneE) => oneE.id !== idToDel));
  };
  const [planedMeters, setPlanedMeters] = useState("");
  const [planedHours, setPlanedHours] = useState("");
  const totalPerformance = levelE.senior * 200 + levelE.junior * 100;
  const hourlyDemand = planedMeters / planedHours;
  
  useEffect(() => {
    if (hourlyDemand <= totalPerformance) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [hourlyDemand, totalPerformance]);

  const handleScheduleWork = () => {
    setPlanedHours("");
    setPlanedMeters("");
  };

  return (
    <section>
      <header>
        <button
          name="list-of-employees"
          data-active={activeTab}
          onClick={() => {
            setActiveTab("list-of-employees");
          }}
        >
          Programators
        </button>
        <button
          name="task"
          data-active={activeTab}
          onClick={() => {
            setActiveTab("task");
            updateLevel();
          }}
        >
          Task
        </button>
      </header>
      {activeTab === "list-of-employees" && (
        <>
          <article>
            {listOfEmployees.map((oneE) => {
              return (
                <p key={oneE.id}>
                  {oneE.name} {oneE.surname} - {oneE.level}
                  <button
                    className="closeButton"
                    onClick={() => {
                      handleDelete(oneE.id);
                    }}
                  >
                    X
                  </button>
                </p>
              );
            })}
          </article>
          <div>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Name"
              name="name"
              value={newE.name}
            />
            <div className='get'>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Surname"
              name="surname"
              value={newE.surname}
            /><div onChange={handleChange} >
            <input type="radio" name="level" value='junior' defaultChecked 
                    />
            Junior
            <input type="radio" name="level" value='senior'
                      />
            Senior</div>
            <button  disabled={!valid2} onClick={handleAdd}>Add Programator</button>
          </div></div>
        </>
      )}
      {activeTab === "task" && (
        <>
          <h2>PLANNING WORKS</h2>
          <ul>
            <li>Junior: {levelE.junior}</li>
            <li>Senior: {levelE.senior}</li>
          </ul>
          <input
            type="number"
            name="lenght"
            
            placeholder="Enter lenght of codes"
            min="0"
            onChange={(e) => setPlanedMeters(e.target.value)}
          />
          <input
            type="number"
            name="hours"
            
            placeholder="Enter the hours"
            min="0"
            onChange={(e) => setPlanedHours(e.target.value)}
          />
          <button className="colorButton" disabled={!valid} onClick={handleScheduleWork}>
            Work planning
          </button>
        </>
      )}
    </section>
  );
}

