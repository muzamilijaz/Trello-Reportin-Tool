
import React, { Component } from 'react'
import auth from '../Hoc/auth';

const ADMINDETAIL={
    username:'MUZAMIL',
    password:123
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            password: null
        };
    }

    getFields = (type, value) => {
        if (type === 'username') {
            console.log('HEREE')
            this.setState({ username: value.toUpperCase() })
        }
        else if (type === 'password') {
            this.setState({ password: value.toUpperCase() })
        }
    }

    handleSubmit = (e) => {
        const { username,password } = this.state
        if(!!username && !!password)
        {
                if(username === ADMINDETAIL.username && password == ADMINDETAIL.password)
                {
                    auth.login(() => this.props.history.push('/dashboard'))
                }
                else {
                    alert('Not authorized')
                }
        }
        e.preventDefault()
     
    }
    render() {
        return (
            <div className="wrapper">
                <section className="content">
                    <div className="container-center animated slideInDown">
                        <div className="view-header">
                            <div className="header-icon">
                                <i className="pe page-header-icon pe-7s-unlock"></i>
                            </div>
                            <div className="header-title">
                                <h3>Login</h3>
                                <small>
                                    Please enter your credentials to login.
                             </small>
                            </div>
                        </div>

                        <div className="panel panel-filled">
                            <div className="panel-body">
                                <form action="index.html" id="loginForm" novalidate>
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="username">Username</label>
                                        <input type="text" placeholder="example@gmail.com" title="Please enter you username"
                                           onChange={e => this.getFields('username', e.target.value)} className="form-control" />
                                        <span className="form-text small">Your unique username to app</span>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="password">Password</label>
                                        <input type="password" title="Please enter your password" placeholder="******"
                                           onChange={e => this.getFields('password', e.target.value)}  className="form-control" />
                                        <span className="form-text small">Your strong password</span>
                                    </div>
                                    <div>
                                        <button className="btn btn-accent" onClick={this.handleSubmit}>Login</button>
                                        <a className="btn btn-default" href="register.html">Register</a>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        )
    }
}


