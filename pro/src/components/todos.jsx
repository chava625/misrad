import axios from "axios";
import React, { Component } from "react";
import { Collapse } from "react-bootstrap";

class Todos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[], todosByUser:[], isOpen: false
        };
    }

    componentDidMount=()=>{
        axios('https://jsonplaceholder.typicode.com/users')
        .then(res =>{
            console.log('users',res.data);
            this.setState({users: res.data})
        }).catch(err =>{
            console.log(err);
        })
    }
    todosByUser = (id) =>{
        axios(`https://jsonplaceholder.typicode.com/todos/?userId=${id}`)
        .then(res =>{
            this.setState({todosByUser:res.data})
            console.log(res.data);
        }).catch(err =>{
            console.log(err);
        })
    }
    handleOpen = (id) =>{
        this.setState({
            isOpen: {
                ...this.state.isOpen,
                [id]: !this.state.isOpen[id]}
            })
            // console.log(this.state.isOpen);
    }
    render() { 
        const { users, isOpen, todosByUser } = this.state;
        if(!users) return [];
        if(!todosByUser) return [];

        return (
            <>
            <h1 className="text-center text-success m-4">Todos</h1>
            <div className="d-flex justify-content-around">
                <div className="users">
                    {users.map(user =>{
                    return(
                        
                        <div className="border border-success rounded p-2 m-2" key={user.id}>
                            <div>
                            <a href="" onClick={(e)=> {e.preventDefault(); this.todosByUser(user.id)}}>{user.name}</a>
                            <button onClick={() => this.handleOpen(user.id,!isOpen)} className="btn btn-outline-secondary btn-sm m-3" aria-controls="example-collapse-text"
        aria-expanded={isOpen}>Read More</button>
                            </div>
                                <Collapse in={isOpen[user.id]}>

                            <div >
                                <p>{user.username}</p>
                                <p>{user.phone}</p>
                                <p>{user.email}</p>
                                <p>{user.website}</p>
                                <p>{user.company.name}</p>
                                <p>{user.company.catchPhrase}</p>
                                <p>{user.company.bs}</p>
                                <p>{user.address.city}</p>
                                <p>{user.address.street}</p>
                                <p>{user.address.suite}</p>
                                <p>{user.address.zipcode}</p>
                                <p>{user.address.geo.lat}</p>
                                <p>{user.address.geo.lng}</p>

                            </div>
                            </Collapse>
                        </div>
                        
                    )})}

                </div>
                <div className="todos">
                    {todosByUser.map(todo =>{
                        return(
                            <div>
                        <div key={todo.userId}>
                            <p className="text-right">{todo.title}</p>
                        </div>
                        </div>
                        )
                    })}
                </div>
            </div>
            </>
        );
    }
}
 
export default Todos;