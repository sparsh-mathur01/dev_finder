import React, { useState } from "react";
import styles from "../css/ShowUsers.module.css";
import { createSearchParams } from "react-router-dom";
function ShowUsers(props) {
  const onClickItemhandler = async (e) => {
    let ind = e.target.parentNode.getAttribute("id");
    let name = props.users[ind].login;
    props.setInput("");
    props.setSearchParams(createSearchParams({ name: name }));
    try {
      let user = await fetch(`https://api.github.com/users/${name}`);
      user = await user.json();
      props.setuser(user);
    } catch (error) {
      console.log(error);
    }
    props.setshow({ profile: true, users: false });
  };

  return (
    props.show.users && (
      <div className={styles.userslist}>
        <ul id="selectedusers">
          {props.users?.map((user, index) => {
            return (
              <li id={index} key={index}>
                <button onClick={onClickItemhandler}>{user.login}</button>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
}

export default ShowUsers;
