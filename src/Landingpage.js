import React, { Component } from "react";
import axios from "axios";
import "./App.css";

export default class Landingpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios.get(`https://panorbit.in/api/users.json`).then((resp) => {
      this.setState({
        users: resp.data["users"],
      });
    });
  }
  render() {
    return (
      <div className="landing">
        <input className="inputtext" type="text" placeholder="type any text" />
        <img className="ic" src={require("./ic.png")} />
        <div className="header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fill-opacity="1"
              d="M0,256L34.3,218.7C68.6,181,137,107,206,117.3C274.3,128,343,224,411,240C480,256,549,192,617,192C685.7,192,754,256,823,261.3C891.4,267,960,213,1029,186.7C1097.1,160,1166,160,1234,160C1302.9,160,1371,160,1406,160L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="contentdiv">
          <div className="subdiv">
            <p className="account">Select an account</p>
          </div>
          <ul className="landingul">
            <div className="listdiv">
              {this.state.users.map((item, id) => (
                <div className="dataDiv" id={id}>
                  <img className="imglanding" src={item.profilepicture} />
                  <li
                    className="landingdiv"
                    onClick={() => this.props.history.push(`/home/${item.id}`)}
                  >
                    {item.name}
                  </li>
                </div>
              ))}
            </div>
          </ul>
        </div>
      </div>
    );
  }
}
