import React, { useEffect, useState } from "react"
import MyContext from "./MyContext"
import {
  Timestamp,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore"
import { fireDB } from "../../firebase/FirebaseConfig"
import { toast } from "react-toastify"

function MyState(props) {
  const [mode, setMode] = useState("light")

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark")
      document.body.style.backgroundColor = "rgb(17,24,39)"
    } else {
      setMode("light")
      document.body.style.backgroundColor = "white"
    }
  }

  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  })

  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("Please fill all fields")
    }

    setLoading(true)
    try {
      const productRef = collection(fireDB, "products")
      await addDoc(productRef, products)
      toast.success("Product Add successfully")
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 800)
      getProductData()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const [product, setProduct] = useState([])

  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time")
        // limit(5)
      )
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = []
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id })
        })
        setProduct(productArray)
        setLoading(false)
      })
      return () => data
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData()
  }, [])

  // update product function
  const edithandle = (item) => {
    setProducts(item)
  }

  // update product
  const updateProduct = async (item) => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products)
      toast.success("Product Updated successfully")
      getProductData()
      setLoading(false)
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 800)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // delete product
  const deleteProduct = async (item) => {
    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id))
      toast.success("Product Deleted successfully")
      setLoading(false)
      getProductData()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        edithandle,
        updateProduct,
        deleteProduct,
      }}
    >
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState
