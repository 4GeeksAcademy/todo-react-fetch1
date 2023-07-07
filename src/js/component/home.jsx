import React, {useEffect, useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todos, setTodos]=useState([])
	const [input, setInput]=useState({})

	useEffect(()=>{
		fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //here is where your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
    })
    .catch(error => {
        //error handling
        console.log(error);
    });
	},[])

	const addTodo=()=>{
		setTodos([...todos,input])
	}
	const inputChange=(event)=>{
		setInput({label:event.target.value, done:false})
	}

	const removeTodo=(index)=>{
		setTodos((todo)=>{
			return todo.filter((item, i)=>i !=index)
		})
	}
	return (
		<div className="text-center">
			<input type="text" onChange={inputChange} />
            <button onClick={addTodo}>Add Todo</button>
            <h1>Todos</h1>
            {todos.map((item, index)=>{
                return(
                    <h6>{item.label}
                    <button onClick={()=>removeTodo(index)}>x</button></h6>
                )
            })}
		</div>
	);
};

export default Home;
