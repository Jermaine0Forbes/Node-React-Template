import React ,{useState, useEffect, useReducer, createContext} from "react";
import Context from "./Context";


const App = () => {
    const 
    [color, setColor] = useState("white"),
    [height, setHeight] = useState(50),
    [width, setWidth] = useState(50),
    [food, setFood] = useState("pizza"),
    handleColor = (e) => {
        console.log(e)
        console.log(e.target)
        console.log(e.target.value)
        setColor(e.target.value)
    },
    handleHeight = (e) => {
        setHeight(e.target.value)
    },
    handleWidth = (e) => {
        setWidth(e.target.value)
    },
    handleFood = (e) => {
        setFood(e.target.dataset.food)
    };

  


    return (
        <>
           <h2 className="text-primary "> Hello from  React</h2> 
           <Context/>
           <section>
                <div className="row col-6">
                        <form>
                            <div className="form-group">
                                <label className="h3 d-block" aria-labelledby="color" htmlFor="color">Color</label>
                                <select className="form-control" defaultValue={"0"} name="color" onChange={(e) => handleColor(e)}>
                                    <option value="0" disabled>Choose a color</option>
                                    <option value="red">Red</option>
                                    <option value="blue">Blue</option>
                                    <option value="green">Green</option>
                                </select>
                            </div> 
                            <div className="form-group">
                                <label className="h3 d-block">Height</label>
                                <input type="number" className="form-control" placeholder="height" name="height-inpt" onChange={(e) => handleHeight(e)} defaultValue={height} />
                            </div>
                            <div className="form-group">
                                <label className="h3 d-block">Width</label>
                                <input type="number" className="form-control" onChange={(e) => handleWidth(e)} defaultValue={width}/>
                            </div>
                        </form>

                </div>
                <div className="row">
                        <ColorBox height={height} width={width} color={color} />
                </div>
           </section>
           <section>
                <div className="btn-group mb-4" role="group" aria-label="Basic example">
                    <button type="button" aria-label="pizza-btn" className="btn btn-primary px-5" data-food="pizza" onClickCapture={(e) => {handleFood(e)}} ><i className="fas fa-pizza-slice"></i></button>
                    <button type="button" aria-label="icecream-btn" className="btn btn-warning px-5" data-food="icecream" onClickCapture={(e) => {handleFood(e)}} ><i className="fas fa-ice-cream text-white"></i></button>
                    <button type="button" aria-label="hamburger-btn" className="btn btn-success px-5" data-food="hamburger" onClick={(e) => {handleFood(e)}} ><i className="fas fa-hamburger"></i></button>
                </div>
                <div className="d-flex justify-content-between col-md-5">
                    <ul className=" list-group" aria-label="pizza-menu" style={food == "pizza" ? {display:"block"} :{display:"none"}}>
                        <li className="list-group-item bg-primary text-white">pizza item 1</li>
                        <li className="list-group-item bg-primary text-white">pizza item 2</li>
                    </ul>
                    <ul className="bg-warning list-group" aria-label="icecream-menu" style={food == "icecream" ? {display:"block"} :{display:"none"}}>
                        <li className="list-group-item bg-warning text-white">icecream item 1</li>
                        <li className="list-group-item bg-warning text-white">icecream item 2</li>
                    </ul>
                    <ul className="bg-success list-group" aria-label="hamburger-menu" style={food == "hamburger" ? {display:"block"} :{display:"none"}}>
                        <li className="list-group-item bg-success text-white">hamburger item 1</li>
                        <li className="list-group-item bg-success text-white">hamburger item 2</li>
                    </ul>
                </div>
           </section>
        </>
    );
}




export const ColorBox = ({height, width, color}) => {

    return (
        <div id="color-box" className="my-5" style={{height: height+"px", width: width+"px", background: color, transition: "all 0.3s"}}>
        </div>
    )
}

export const NameForm = () => {

    const 
    [title, setTitle ] = useState(null),
    [first, setFirst ] = useState(null),
    [last, setLast ] = useState(null),
    handleVal = (e) => {
        const val = e.target.value, attr = e.target.getAttribute("aria-label");
        if(val){
            switch(attr)
            {
                case "select-title":
                    setTitle(val)
                    break;
                case "input-first":
                    setFirst(val)
                    break;
                case "input-last":
                    setLast(val)
                    break;
            }
        } 
    };

    return(
        <section>
            <form className="name-form row co-6">
                <div className="form-group">
                    <select defaultValue={0} aria-label="select-title" onChange={(e) => {handleVal(e)}}>
                        <option value="0" disabled>Choose a title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" aria-label="input-first" placeholder="first name"  onChange={(e) => {handleVal(e)}}/>
                </div>
                <div className="form-group">
                <input type="text" className="form-control" aria-label="input-last" placeholder="last name" onChange={(e) => {handleVal(e)}} />
                </div>
                <input type="submit" className="btn btn-primary" value="Submit" onClick={ (e) => handleClick}/>
            </form>
            <div >
                <p>this is a paragraph</p>
                {
                    
                    title && first && last ?
                      <p aria-label="output-name" role="article">Hello, {title} {first} {last}</p>
                    :
                        null
                        
                }
            </div>
        </section>
    )
}

export default App;