import React, { useContext } from "react"
import Layout from "../../components/layout/Layout"
import MyContext from "../../context/data/MyContext"
import HeroSection from "../../components/heroSection/HeroSection"
import Filter from "../../components/filter/Filter"

function Home() {
  return (
    <Layout>
      <HeroSection />
      <Filter />
    </Layout>
  )
}

export default Home
