import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Search from "./Search";
import ShowUsers from "./ShowUsers";
import Header from "./Header";
import { useSearchParams, createSearchParams } from "react-router-dom";
export default function Home() {
  const [user, setuser] = useState({});
  const [users, setusers] = useState([]);
  const [show, setshow] = useState({ profile: false, users: false });
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState("");

  useEffect(()=>{
    if (searchParams.get("name") == null && searchParams.get("q") == ""){
      setSearchParams(createSearchParams({}))
    }
  },[])

  return (
    <>
      <Header />
      <Search
        input={input}
        setInput={setInput}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        user={user}
        show={show}
        setuser={setuser}
        setusers={setusers}
        setshow={setshow}
        />
      <ShowUsers
        users={users}
        setuser={setuser}
        setSearchParams={setSearchParams}
        show={show}
        setshow={setshow}
        setInput={setInput}
        />
      <Profile
        setInput={setInput}
        user={user}
        setuser={setuser}
        show={show}
        setshow={setshow}
        searchParams={searchParams}
      />
    </>
  );
}
