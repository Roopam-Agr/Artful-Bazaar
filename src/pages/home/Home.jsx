import React, { useContext } from "react"
import Layout from "../../components/layout/Layout"
import MyContext from "../../context/data/MyContext"
import HeroSection from "../../components/heroSection/HeroSection"
function Home() {
  return (
    <Layout>
      <HeroSection />
    </Layout>
  )
}

export default Home
