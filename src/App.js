import { useState, useEffect } from "react";
import "./App.css";


export default function App() {
  const [state, setState] = useState({
    skills: [{ name: "", address: null, longitude: null, latitude: null }],
    newSkill: {
      name: "",
      address: "",
      longitude: "",
      latitude: ""
    },
  });

  useEffect(function() {
    async function getAppData() {

      const skills = await fetch('http://https://pammys-backend-final.herokuapp.com//api/skills')
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
      const skill = await fetch('http://https://pammys-backend-final.herokuapp.com//api/skills', {
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
          address: "",
          longitude: "",
          latitude: ""
        }
      });
      
    } catch (error) {
      // do something else so my users don't freak out 😄
      console.log(error);
    }
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
          <input name="name" value={state.newSkill.skill} onChange={handleChange}/>
        </label>
        <label>
          <span>Address</span>
          <input name="address" value={state.newSkill.level} onChange={handleChange}>
          </input>
        </label>
        <label>
          <span>Longitude</span>
          <input name="longitude" value={state.newSkill.longitude} onChange={handleChange}/>
        </label>
        <label>
          <span>Address</span>
          <input name="latitude" value={state.newSkill.laditude} onChange={handleChange}>
          </input>
        </label>
        <button>ADD CUSTOMER NAME AND DELIVERY ADDRESS</button>
      </form>
    </section>
  );
}


