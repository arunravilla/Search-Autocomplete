import React from "react";
import ReactDOM from "react-dom";

import UserCard from "./components/UserCard";

import "./App.css";
import searchIcon from "./icons/search-icon.svg";
import closeIcon from "./icons/close-icon.svg";

import { scrollIntoView } from "./utils";
import mockData from "./mock";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: "",
      isOpen: false,
      users: mockData,
      highlightedIndex: null,
      filteredUsers: []
    };
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onOutsideMenuClick = this._onOutsideMenuClick.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputClear = this._onInputClear.bind(this);
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this._onOutsideMenuClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this._onOutsideMenuClick);
  }

  _onMenuClose() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }
  _onInputClear() {
    this.setState({
      searchKeyword: "",
      isOpen: false
    });
  }
  _onInputChange({ target }) {
    const { users } = this.state;
    debugger;

    const filteredUsers = this.getfilteredUsers(users, target.value);
    this.setState({
      searchKeyword: target.value,
      isOpen: target.value ? true : false,
      filteredUsers: filteredUsers
    });
  }
  _onOutsideMenuClick(event) {
    if (
      this.menuRef &&
      this.menuRef.contains &&
      !this.menuRef.contains(event.target)
    ) {
      return;
    }
    this._onMenuClose();
  }
  _onMouseEnter(index) {
    this.setState({ highlightedIndex: index });
  }

  _onKeyDown(event) {
    if (this.keyDownHandlers[event.key])
      this.keyDownHandlers[event.key].call(this, event);
    else if (!this.state.isOpen) {
      this.setState({
        isOpen: true
      });
    }
  }
  keyDownHandlers = {
    ArrowDown(event) {
      const { highlightedIndex, filteredUsers } = this.state;

      event.preventDefault();

      if (!filteredUsers.length) return;

      let index = highlightedIndex === null ? -1 : highlightedIndex;

      for (let i = 0; i < filteredUsers.length; i++) {
        const p = (index + i + 1) % filteredUsers.length;
        index = p;
        break;
      }

      if (index > -1 && index !== highlightedIndex) {
        this.setState(
          {
            highlightedIndex: index,
            isOpen: true
          },
          () => {
            scrollIntoView(ReactDOM.findDOMNode(this.refs[`item-${index}`]));
          }
        );
      }
    },

    ArrowUp(event) {
      const { highlightedIndex, filteredUsers } = this.state;

      event.preventDefault();

      if (!filteredUsers.length) return;

      let index =
        highlightedIndex === null ? filteredUsers.length : highlightedIndex;

      for (let i = 0; i < filteredUsers.length; i++) {
        const p =
          (index - (1 + i) + filteredUsers.length) % filteredUsers.length;
        index = p;
        break;
      }

      if (index !== filteredUsers.length) {
        this.setState(
          {
            highlightedIndex: index,
            isOpen: true
          },
          () => {
            scrollIntoView(ReactDOM.findDOMNode(this.refs[`item-${index}`]));
          }
        );
      }
    },

    Escape(event) {
      event.preventDefault();

      this.setState({
        highlightedIndex: null,
        isOpen: false
      });
    }
  };

  /**
   * Filters user list by giving search keyword [id, name, address, item]
   * @param {Array} data
   * @param {string} filterKeyword
   * @returns {Array} filtered users
   * @memberof App
   */
  getfilteredUsers(data, filterKeyword) {
    let regex = new RegExp(`^(${filterKeyword}).*$`, "i");

    if (!data.length) return [];
    const filteredList = data.filter(({ id, name, address, items }) => {
      // Used for filtering item from items by given keyword
      const matchingItem = items.find(
        item => item.toLowerCase() === filterKeyword.toLowerCase()
      );

      if (
        regex.test(id) ||
        regex.test(name) ||
        regex.test(address) ||
        matchingItem
      ) {
        return {
          id,
          name,
          address,
          ...(matchingItem ? { matchingItem } : null)
        };
      }
      return false;
    });

    return filteredList;
  }

  render() {
    const { isOpen, filteredUsers, searchKeyword } = this.state;

    return (
      <div className="app">
        <div className="input_wrapper">
          <div className="input_container" onKeyDown={this._onKeyDown}>
            <img src={searchIcon} alt="search" className="search-icon" />
            <input
              type="text"
              className="input_box"
              placeholder="Search user by ID, address, name, pincode"
              onChange={this._onInputChange}
              value={searchKeyword}
            />
            <img
              onClick={this._onInputClear}
              src={closeIcon}
              className="close-icon"
              alt="close"
            />
          </div>
          {isOpen && searchKeyword && (
            <div className="search_result_container">
              <ul className="search_result" ref={this.menuRef}>
                {filteredUsers && filteredUsers.length ? (
                  filteredUsers.map((item, idx) => (
                    <UserCard
                      key={item.id}
                      ref={"item-" + idx}
                      item={item}
                      idx={idx}
                      searchKeyword={searchKeyword}
                      isActive={this.state.highlightedIndex === idx}
                      _onMouseEnter={this._onMouseEnter}
                    />
                  ))
                ) : (
                  <div className="no_user">No User Found</div>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
