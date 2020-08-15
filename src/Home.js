import React, { Component } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      company: [],
      address: [],
      geo: [],
      zoom: 2,
      center: {
        lat: 59.95,
        lng: 30.33,
      },
      data: [],
      popup: false,
      newdata: [],
      chatpopup: false,
      option: true,
    };
  }

  async componentDidMount() {
    let id = window.location.pathname.split("/")[2];

    await axios.get(`https://panorbit.in/api/users.json`).then((resp) => {
      this.setState({
        users: resp.data["users"][id - 1],
        company: resp.data["users"][id - 1]["company"],
        address: resp.data["users"][id - 1]["address"],
        geo: resp.data["users"][id - 1]["address"]["geo"],
        data: resp.data["users"],
      });
    });
    const newdata = this.state.data.filter((item) => item.id !== parseInt(id));
    this.setState({ newdata });
  }

  handleclick = () => {
    this.state.popup === false
      ? this.setState({
          popup: true,
        })
      : this.setState({
          popup: false,
        });
  };

  handlechat = () => {
    this.state.chatpopup === false
      ? this.setState({
          chatpopup: true,
        })
      : this.setState({
          chatpopup: false,
        });
  };

  handlediv = () => {
    this.setState({
      option: true,
    });
  };
  handleoption = () => {
    this.setState({
      option: false,
    });
  };
  render() {
    return (
      <div className="main">
        <div className="leftdiv">
          <p className="option" onClick={this.handlediv}>
            Profile
          </p>
          <p className="option" onClick={this.handleoption}>
            Posts
          </p>
          <p className="option" onClick={this.handleoption}>
            Gallery
          </p>
          <p className="option" onClick={this.handleoption}>
            ToDo
          </p>
        </div>
        <div className="rightdiv">
          <header>
            <p className="headerPara">Profile</p>
            <div className="popupdiv">
              <div className="info">
                <img className="image" src={this.state.users.profilepicture} />
                <p className="popuppara" onClick={this.handleclick}>
                  {this.state.users.name}
                </p>
              </div>

              {this.state.popup === true ? (
                <div className="infodiv">
                  <img
                    className="signoutimg"
                    src={this.state.users.profilepicture}
                  />
                  <p className="para1">{this.state.users.name}</p>
                  <p className="para2">{this.state.users.email}</p>
                  <ul style={{ margin: 0, padding: 0 }}>
                    <div className="div2">
                      {this.state.newdata.map((item, id) => (
                        <div className="div1" id={id}>
                          <img
                            className="dynamicimg"
                            src={item.profilepicture}
                          />
                          <li
                            className="signoutlist"
                            onClick={() =>
                              window.location.href(`/home/${item.id}`)
                            }
                          >
                            {item.name}
                          </li>
                        </div>
                      ))}
                    </div>
                  </ul>

                  <button
                    type="button"
                    className="signbutton"
                    onClick={() => this.props.history.push(`/`)}
                  >
                    Sign Out
                  </button>
                </div>
              ) : null}
            </div>
          </header>
          {this.state.option === true ? (
            <div className="bodydiv">
              <div className="personel">
                <img
                  className="personelimage"
                  src={this.state.users.profilepicture}
                />
                <p className="namePara">{this.state.users.name}</p>
                <p className="detailpara">
                  Username : {this.state.users.username}
                </p>
                <p className="detailpara">Email : {this.state.users.email}</p>
                <p className="detailpara">Phone : {this.state.users.phone}</p>
                <p className="detailpara">
                  Website : {this.state.users.website}
                </p>
                <p className="company">Company</p>
                <p className="companydetail">Name: {this.state.company.name}</p>
                <p className="companydetail">
                  {" "}
                  catchPhrase: {this.state.company.catchPhrase}{" "}
                </p>
                <p className="companydetail">bs: {this.state.company.bs} </p>
              </div>
              <div className="addressdiv">
                <p className="address">Address:</p>
                <p className="addressdetail">
                  {" "}
                  Street: {this.state.address.street}
                </p>
                <p className="addressdetail">
                  Suite: {this.state.address.suite}
                </p>
                <p className="addressdetail">City: {this.state.address.city}</p>
                <p className="addressdetail">
                  Zipcode: {this.state.address.zipcode}
                </p>
                <div className="googlemap">
                  <GoogleMapReact
                    className="googlediv"
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                  ></GoogleMapReact>
                </div>
                <div className="latdiv">
                  <p className="geodiv">Lat:{this.state.geo.lat}</p>
                  <p className="geodiv">Long:{this.state.geo.lng}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="coming">
              <p className="comingpara">Coming Soon</p>
            </div>
          )}
        </div>

        {this.state.chatpopup === true ? (
          <div className="chatdiv" onClick={this.handlechat}>
            <div className="chathead">
              <img className="imgchat" src={require("./chat.png")} />
              <p className="footerpara">Chats</p>
              <img className="imgfooter" src={require("./down.png")} />
            </div>
            <div className="chatbody">
              {this.state.newdata.map((item, id) => (
                <div className="datafoot" style={{ margin: 0 }} id={id}>
                  <ul className="unorder">
                    <li className="info">
                      <div class="footchat">
                        <img className="chating" src={item.profilepicture} />
                        <p className="datalist">{item.name}</p>
                      </div>
                      <div className="onlinediv">
                        <span className="footerspan"></span>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="footer" onClick={this.handlechat}>
            <img className="imgchat" src={require("./chat.png")} />
            <p className="footerpara">Chats</p>
            <img className="imgfooter" src={require("./arrowup.png")} />
          </div>
        )}
      </div>
    );
  }
}
