import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import {addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp} from 'firebase/firestore'
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
import UpdateProduct from './../../pages/admin/pages/UpdateProduct';
const myState = (props) => {
    const [mode,setMode] = useState('light');
    

    const toggleMode = () =>{
        if(mode==='light'){
            setMode('dark');
            document.body.backgroundColor = 'rgb(17,24,39)';
        }else{
            setMode('light');
            document.body.backgroundColor = 'white';
        }
    }
    

    const [loading, setLoading] = useState(false);



    const [products,setProducts] = useState({
        title:null,
        price:null,
        imageUrl:null,
        category:null,
        description:null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric"
            }
        )
    });

    const addProduct = async () =>{
        if(products.title === null || products.price === null ||
            products.imageUrl === null || products.category === null || products.description === null){
                return toast.error("All fields are required");
        }

        // Storing products in FireStore
        setLoading(true);
        const productRef = collection(fireDB,"products");
        
        try{
            
            await addDoc(productRef,products);
            toast.success("Product Added successfully");
            setTimeout(() =>{
                window.location.href = "/dashboard";
            },800);
            // navigate('/dashboard');
            getProductData();
            
            
            
            setLoading(false);
            
            
            
        }catch(err){
            console.log(err);
            setLoading(false);
        }
        setProducts({
            title: "",
            price: "",
            imageUrl: "",
            category: "",
            description: "",
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric"
            })
        });
        // setProducts("");
    }

    const [product,setProduct] = useState([]);

    const getProductData = async () =>{
        setLoading(true);

        try{
            const q = query(
                collection(fireDB,"products"),
                orderBy('time')
            );

            const data = onSnapshot(q,(QuerySnapshot) =>{
                let productArray = [];
                QuerySnapshot.forEach( (doc) =>{
                    productArray.push({...doc.data(), id:doc.id});
                });
                setProduct(productArray);
                setLoading(false);
            });

            return () => data();

        }catch(err){
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() =>{
        getProductData()
    },[]);


    // Update product function
    const editHandle = (item)=>{
        setProducts(item);
    }

    const updateProduct = async () =>{
        setLoading(true);
        try{
            await setDoc(doc(fireDB,"products",products.id),products)
            toast.success("Product updated successfully");
            getProductData();
            setTimeout(()=>{
                window.location.href = "/dashboard";
            },800);
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    const deleteProduct = async (item)=>{
        try{
            setLoading(true);
            await deleteDoc(doc(fireDB,"products",item.id));
            toast.success("Product deleted successfully");
            console.log(item);
            getProductData();
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    const deleteOrder = async (item)=>{
        try{
            setLoading(true);
            await deleteDoc(doc(fireDB,"order",item.id));
            console.log(item)
            toast.success("Order deleted successfully");
            getProductData();
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    const [order, setOrder] = useState([]);

    // const placeOrder = async (orderData) => {
    //     setLoading(true);
    //     try {
    //       await addDoc(collection(fireDB, "order"), orderData);
    //       toast.success("Order placed successfully!");
    //       getOrderData(); // refresh orders list
    //       setLoading(false);
    //     } catch (error) {
    //       console.error("Error placing order:", error);
    //       setLoading(false);
    //     }
    //   };
      

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "order"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
    //   console.log(ordersArray)
    //   setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
    //   console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  useEffect(() => {
    // getProductData();
    getOrderData();
    getUserData();

  }, []);



  const [searchKey, setSearchKey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')


  return (
    <MyContext.Provider value={{mode,toggleMode,loading,setLoading, products,setProducts,addProduct,product,editHandle,updateProduct,deleteProduct,order,deleteOrder,user,searchKey,setSearchKey,filterType,setFilterType,filterPrice,setFilterPrice}} >
        {props.children}
    </MyContext.Provider>
  )
}

export default myState