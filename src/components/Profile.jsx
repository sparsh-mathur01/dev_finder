import React, { useEffect } from "react";
import styles from "../css/Profile.module.css";
import twitter from "../images/twitter.svg";
import link from "../images/link.svg";
import location from "../images/location.svg";
import company from "../images/company.png";

export default function Profile(props) {
  let { user } = props;
  useEffect(() => {
    const name = props.searchParams.get("name");
    async function fetchuser(name) {
      try {
        let user = await fetch(`https://api.github.com/users/${name}`);
        user = await user.json();
        props.setuser(user);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
      props.setshow({ profile: true, users: false });
    }
    if (name && name.length > 0) fetchuser(name);
  }, []);

  return (
    props.show.profile && (
      <div className={styles.card}>
        <div className={styles.userimg}>
          <img src={user.avatar_url} alt="" />
        </div>

        <div className={styles.infoMain}>
          <h3>{user.name ?? "GitHub User"}</h3>
          <a href={user.html_url}>@{user.login}</a>
        </div>
        <div className={styles.bio}>
          <p>{user.bio ?? "This Profile has no bio"}</p>
        </div>

        <div className={styles.joiningdate}>
          <p>Joined {new Date(user.created_at).toUTCString().slice(5, 16)}</p>
        </div>

        <div className={styles.details}>
          <div className={styles.repos}>
            <p>Repos</p>
            <b>{user.public_repos}</b>
          </div>
          <div className={styles.followers}>
            <p>Followers</p>
            <b>{user.followers}</b>
          </div>
          <div className={styles.Following}>
            <p>Following</p>
            <b>{user.following}</b>
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.set1}>
            <a className={styles.location} style={{color: !!user.location?"white":"grey"}} >
              <img className={styles.linkimg} src={location} alt="" />
              {!!user.location?user.location: "No location"}
            </a>
            <a className={styles.blog} style={{color: !!user.blog?"white":"grey"}}>
              <img className={styles.linkimg} src={link} alt="" />
              {!!user.blog?user.blog: "No Blog"}
            </a>
          </div>

          <div className={styles.set2}>
            <a className={styles.Twitter} style={{color: !!user.twitter_username?"white":"grey"}}>
              <img className={styles.linkimg} src={twitter} alt="" />
              {!!user.twitter_username?user.twitter_username: "Not Available"}
            </a>
            <a className={styles.github} style={{color: !!user.github?"white":"grey"}}>
              <img className={styles.linkimg} src={company} alt="" />
              @github
            </a>
          </div>
        </div>
      </div>
    )
  );
}
