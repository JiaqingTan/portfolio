import * as React from "react"
import "./index.css"

// styles
const pageStyles = {
  color: "#ededed"
}

const centerStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  alignItems: "center",
  textAlign: "center"
}
const headingStyles = {
  fontFamily: "Montserrat",
  color: "#1d1d1d",
  fontSize: "100px",
  letterSpacing: "0.75rem",
  fontWeight: "bolder",
  padding: "0 5rem 0 5rem",
  marginBottom: "2rem"
}
const h2Styles = {
  fontFamily: "Montserrat",
  color: "#1d1d1d",
  fontSize: "40px",
}
const headingAccentStyles = {
  color: "#663399",
}


// markup
const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Tan Jiaqing</title>
      <div style={centerStyles}>
        <h1 style={headingStyles}>
          TAN JIAQING
        </h1> 
        <hr class="solid"></hr>
        <h2 style={h2Styles}>
          (Site is under construction)
        </h2> 
      </div>
    </main>
  )
}

export default IndexPage
