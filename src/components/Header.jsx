import React from 'react'
import styles from "../css/Header.module.css"
import sun from "../images/sun.png"

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>devFinder</h1>
      <div><b>LIGHT</b><img onClick={() => alert("toggling theme is not supported in your system")} src={sun} alt="" /></div>
    </div >
  )
}

export default Header