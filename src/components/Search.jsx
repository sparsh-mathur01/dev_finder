import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../css/Search.module.css";
import ShowUsers from "./ShowUsers";
import search from "../images/search.png";
import { useSeachParams, createSearchParams } from "react-router-dom";

function Search(props) {
  useEffect(() => {
    const q = props.searchParams.get("q");
    async function fetchusers() {
      props.setInput(q);
      let users = await fetch(`https://api.github.com/search/users?q=${q}`);
      users = await users.json();
      props.setusers(users.items.slice(0, 5));
      props.setshow({ profile: false, users: true });
    }
    if (q && q.length > 0) {
      fetchusers();
    }
  }, []);

const onQuickChangeHandler = (e)=>{
  const query = e.target.value;
  props.setInput(query);
  optimisedOnChangeHandler(query);
}

  const onChangeHandler = async (query) => {
    // const query = e.target.value;
    // props.setInput(query);
    props.setSearchParams(createSearchParams({ q: query }));
    async function fetchusers(query) {
      try {
        let users = await fetch(
          `https://api.github.com/search/users?q=${query}`
        );
        users = await users.json();
        props.setusers(users.items.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    }
    if (query.length > 0) {
      fetchusers(query);
      props.setshow({ profile: false, users: true });
    } else props.setshow({ profile: false, users: false });
  };

  const debounce = (onChangeHandler) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        onChangeHandler.apply(context, args);
      },500);
    };
  };
  const optimisedOnChangeHandler = useCallback(debounce(onChangeHandler), []);

  const onClickSearchHandler = async (event) => {
    event.preventDefault();
    props.setSearchParams(createSearchParams({ name: props.input }));
    async function fetchuser() {
      props.setInput("");
      try {
        let user = await fetch(`https://api.github.com/users/${props.input}`);
        user = await user.json();
        props.setuser(user);
        props.setshow({ profile: true, users: false });
      } catch (error) {
        console.log(error);
      }
    }
    if (props.input) fetchuser();
  };

  return (
    <div className={styles.searchcontainer}>
      <div className={styles.searchimg}>
        <img src={search} alt="" />
      </div>
      <form action="submit">
        <input
          type="text"
          value={props.input}
          id="inp"
          name="name"
          onChange={onQuickChangeHandler}
          placeholder="Search Github username..."
        />
        <button onClick={onClickSearchHandler}>Search</button>
      </form>
    </div>
  );
}

export default Search;
