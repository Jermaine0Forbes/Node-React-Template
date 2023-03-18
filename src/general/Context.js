import React ,{useState, useEffect, useContext, createContext, useReducer}from "react";

const MyContext = createContext();

const initialState = {
    name: "Jermaine Forbes",
    age: 31,
    happiness:3,
}

const reducer = (state, action) => {
    switch(action.type){
        case "update_name":
            return {
                ...state,
                name:action.payload
            }   
        case "update_age":
            return {
                ...state,
                age:action.payload
            }   
        case "update_happiness":
            return {
                ...state,
                happiness:action.payload
            }
        default: 
         return state

    }
}
const Context = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <MyContext.Provider value={{state,dispatch}}>
            <section>
                <ContextForm/>
                <ContextResult/>
            </section>
        </MyContext.Provider>
    )
}

export const  ContextForm = () => {
      const currentContext = useContext(MyContext);
    return (
        <form>
            <div className="form-group">
                <label>Name</label>
                <input type="text" aria-label="name-input" onChange={(e) => {currentContext.dispatch({type:"update_name", payload:e.target.value})}} defaultValue={currentContext.state.name}/>
            </div>
            
            <div className="form-group">
                <label>Age</label>
                <input type="number" aria-label="age-input" onChange={(e) => {currentContext.dispatch({type:"update_age", payload:e.target.value})}} defaultValue={currentContext.state.age}/>
            </div>

            <div className="form-group">
                <label >Happiness</label>
                <select defaultValue={currentContext.state.happiness} onChange={(e) => {currentContext.dispatch({type:"update_happiness", payload:e.target.value})}}>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>

        </form>
    )
}

export const ContextResult = () => {
    const ctxt = useContext(MyContext)
    return (
        <div>
            <p>{ctxt.state.name}</p>
            <p>{ctxt.state.age}</p>
            <p>{ctxt.state.happiness}</p>
        </div>
    )
}

export default Context;