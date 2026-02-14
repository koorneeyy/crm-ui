import React, { Component } from "react";
import UAVDataService from "../services/uav.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveUAVs = this.retrieveUAVs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUAV = this.setActiveUAV.bind(this);
    this.removeAllUAV = this.removeAllUAV.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      UAVs: [],
      currentUAV: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveUAVs();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveUAVs() {
    UAVDataService.getAll()
      .then(response => {
        this.setState({
          UAVs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUAVs();
    this.setState({
      currentUAV: null,
      currentIndex: -1
    });
  }

  setActiveUAV(UAV, index) {
    this.setState({
      currentUAV: UAV,
      currentIndex: index
    });
  }

  removeAllUAV() {
    UAVDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    UAVDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, UAVs, currentUAV, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Список засобів</h4>

          <ul className="list-group">
            {UAVs &&
              UAVs.map((UAV, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUAV(UAV, index)}
                  key={index}
                >
                  {UAV.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentUAV ? (
            <div>
              <h4>Засіб</h4>
              <div>
                <label>
                  <strong>Назва:</strong>
                </label>{" "}
                {currentUAV.title}
              </div>
              <div>
                <label>
                  <strong>Опис:</strong>
                </label>{" "}
                {currentUAV.description}
              </div>
              <div>
                <label>
                  <strong>Статус:</strong>
                </label>{" "}
                {currentUAV.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/all/" + currentUAV.id}
                className="badge badge-warning"
              >
                Змінити
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Клікніть на засіб...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
