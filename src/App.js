import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "./App.css";


export default function App() {
  const [state, setState] = useState({
    skills: [{ skill: "JavaScript", level: 4 }],
    newSkill: {
      name: "",
      address: "",
      longitude: "",
      latitude: ""
    },
  });
  const [viewport, setViewport] = useState({
    latitude: 33.7032626,
    longitude: -117.93113,
    width: '70vw',
    height: '70vh',
    zoom: 11
  });
  const [marker] = useState({
    latitude: 33.7032626,
    longitude: -117.93113
  });

  useEffect(function() {
    async function getAppData() {

      const skills = await fetch('http://localhost:3001/api/skills')
      .then(res => res.json());
      
      setState(prevState => ({
        ...prevState,
        skills
      }));
    }

    getAppData();
  
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const skill = await fetch('http://localhost:3001/api/skills', {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify(state.newSkill)
      }).then(res => res.json());
  
      setState({
        skills: [...state.skills, skill],
        newSkill: {
          name: "",
          address: "3"
        }
      });
      
    } catch (error) {
      // do something else so my users don't freak out 😄
      console.log(error);
    }
  }

  function handleMap(e) {
    return <div>maaaap</div>
  }



  function handleChange(e) {
    setState(prevState => ({
        skills: prevState.skills,
        newSkill: {
          ...prevState.newSkill,
          [e.target.name]: e.target.value
        }
    }));
  }

  return (
    <section>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken='pk.eyJ1IjoiamltcGZyZWQiLCJhIjoiY2twNHU2bzJyMjNzZzJ1cXcweTN6azMyZSJ9.EL6OH1RDBnamvnIFj9tmXw'
        onViewportChange= {viewport => {
          setViewport(viewport)
        }}
      >
        <Marker latitude={marker.latitude} longitude={marker.longitude}>
        <div>*</div>
        </Marker>
      </ReactMapGL>
      <h2>PAMMY'S WHOLESALE FISH MARKET CUSTOMER LIST</h2>
      <hr />
      {state.skills.map((s, i) => (
        <article key={i}>
          <div>{s.name}</div> <div>{s.address}</div>
        </article>
      ))}
      <hr />  
      <form onSubmit={handleSubmit}>
        <label>
          <span>Customer Name</span>
          <input name="name" placeholder='i.e. Fishermans Diner' value={state.newSkill.skill} onChange={handleChange}/>
        </label>
        <label>
          <span>Address</span>
          <input name="address" placeholder='i.e. 222 Walnut St. Rosemont, CA' value={state.newSkill.level} onChange={handleChange}>
          </input>
        </label>
        <button>ADD CUSTOMER NAME AND DELIVERY ADDRESS</button>
      </form>
      <form onSubmit={handleMap}>
        <button>MAP</button>
      </form>
    </section>
  );
}
