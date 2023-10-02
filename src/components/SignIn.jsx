import React from "react";

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signInEmail:"", signInPassword:"",
            registerEmail:"", registerPassword:"", registerName:""
        }
    }

    onregisterNameChange=(event)=>{
        this.setState({registerName:event.target.value})
    }

    onregisterEmailChange=(event)=>{
        this.setState({registerEmail:event.target.value})
    }

    onregisterPasswordChange=(event)=>{
        this.setState({registerPassword:event.target.value})
    }

    onsignInEmailChange=(event)=>{
        this.setState({signInEmail:event.target.value})
    }

    onsignInPasswordChange=(event)=>{
        this.setState({signInPassword:event.target.value})
    }

    onSubmitSignIn=()=>{
        fetch("http://localhost:3000/signin",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body :JSON.stringify({
                email : this.state.signInEmail,
                password : this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(data=>{
            if(data.id){
                this.props.loadUser(data);
                this.props.changeRoute("home");
            }
        });
    }

    onSubmitRegister=()=>{
        fetch("http://localhost:3000/register",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body :JSON.stringify({
                name: this.state.registerName,
                email : this.state.registerEmail,
                password : this.state.registerPassword
            })
        })
        .then(repsonse=>repsonse.json())
        .then(user => {
            console.log(user);
            if(user.email && user.name){
                this.props.loadUser(user);
                this.props.changeRoute("home");
            }
        })
    }


    render(){
        return(
            <div className="flex justify-center items-center">
            <div className="log b-transparent w-fit">
            <div className="flex flip h-auto justify-center items-center">
                <div className="grid signincard p-2 m-4 h-auto min-w-[350px] bg-white bg-opacity-20 backdrop-blur-4xl rounded-xl shadow-2xl grid-rows-5">
                <div className="flex justify-center items-center">
                    <div className="w-fit bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex justify-center items-center">
                        <p className="bg-slate-300 rounded-xl p-2 text-black mix-blend-screen text-2xl">SignIn</p>
                    </div>
                    </div>
                    <div className="flex justify-center items-center"><input onChange={this.onsignInEmailChange} className="rounded-xl shadow-2xl p-3" type="email" placeholder="Email"></input></div>
                    <div className="flex justify-center items-center"><input onChange={this.onsignInPasswordChange} className="rounded-xl shadow-2xl p-3 m-2" type="password" placeholder="Password"></input></div>
                    <div className="flex justify-center items-center gap-8">
                        <button onClick={this.onSubmitSignIn} className="rounded-xl shadow-2xl p-3 w-fit bg-black">SignIn</button>
                        <button onClick={this.props.flip} className="rounded-xl shadow-2xl p-3 w-fit bg-black">Register</button>
                    </div>
                </div>
                <div className="grid absolute register p-2 m-4 min-w-[350px] rounded-xl shadow-2xl grid-rows-5">
                    <div className="flex justify-center items-center">
                    <div className="w-fit bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-xl flex justify-center items-center">
                        <p className="bg-slate-300 rounded-xl p-2 text-black mix-blend-screen text-2xl">Register</p>
                    </div>
                    </div>
                    <div className="flex justify-center items-center"><input onChange={this.onregisterNameChange} className="rounded-xl shadow-2xl p-3 m-2" type="text" placeholder="Name"></input></div>
                    <div className="flex justify-center items-center"><input onChange={this.onregisterEmailChange} className="rounded-xl shadow-2xl p-3" type="email" placeholder="Email"></input></div>
                    <div className="flex justify-center items-center"><input onChange={this.onregisterPasswordChange} className="rounded-xl shadow-2xl p-3 m-2" type="password" placeholder="Password"></input></div>
                    <div className="flex justify-center items-center gap-8">
                        <button onClick={this.props.flip} className="rounded-xl shadow-2xl p-3 w-fit bg-black">SignIn</button>
                        <button onClick={this.onSubmitRegister} className="rounded-xl shadow-2xl p-3 w-fit bg-black">Register</button>
                    </div>
                </div>
            </div>
            </div>
            </div>
        )
    }
   
}

export default SignIn;