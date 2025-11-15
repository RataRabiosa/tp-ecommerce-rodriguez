import React, { useEffect, useState } from 'react'
import { CartStorage } from '../store/userCartStorage.js'
import Cards from '../components/Cards.jsx'
import manageDrawer from '../components/manageDrawerState.js';

const Products = () => {

  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { checked, toggle } = manageDrawer();
  const { totalCartItems, addToCart } = CartStorage();

  const updateCart = (id, title, price, quantity, image) => {
    
    addToCart({ id, title, price, quantity, image });
    toggle();
  }
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Esperar 2 segundos para simular carga
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const resp = await fetch("http://localhost:8000/products");
        if (!resp.ok) {
          throw new Error(`Error al obtener productos - status: ${resp.status}`);
        }
        const json = await resp.json();
        setProductList(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
    // Mostrar icono de carga mientras se obtienen los productos
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  // Mostrar error si falla la carga
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );

  return (
    <>
      <div className="menu menu-vertical lg:menu-horizontal">
        {productList.map(item => (
        <Cards
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          price={item.price}
          image={item.images[0]}
          onClick={updateCart}
        />
      ))}
      </div>
    </>
  )
}

export default Products