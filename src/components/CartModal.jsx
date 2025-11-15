import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { CartStorage } from '../store/userCartStorage';

const CartModal = () => {
    // desestructurar funciones del carrito
    const { clearCart, totalCheckout, totalCartItems } = CartStorage();

    // desestructurar useForm
    const { handleSubmit, register } = useForm();

    // funcion que maneja el submit del formulario
    const onSubmit = async (e) => {

    try {
        const createOrder = await fetch('http://localhost:8000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e)
        });
        const orderResponse = await createOrder.json();

        if (createOrder.status === 201) {
            setOrderStatus('success');
        } else {
            setOrderStatus('error');
        }
    } catch (error) {
        console.error('Error al crear la orden:', error);
        setOrderStatus('error');
        }
    };

    // guardar estado de la orden
    const [orderStatus, setOrderStatus] = useState(null);

  return (
    <>
        <div className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("CartModal").close()}>✕</button>
            <div className="carousel w-full min-h-[400px]">
                <div id="slide1" className="carousel-item relative w-full flex justify-center items-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Detalles del pago</legend>

                        <label className="label">Nombre</label>
                        <input type="text" className="input" placeholder="John Doe" {...register("nombre", {required: true})}/>

                        <label className="label">Correo</label>
                        <input type="text" className="input" placeholder="john@doe.com" {...register("correo", {required: true})}/>

                        <label className="label">Telefono</label>
                        <input type="text" className="input" placeholder="1234567890" {...register("telefono", {required: true})}/>

                        </fieldset>
                        <p className="mt-5"><b>{totalCartItems()} articulos</b></p>
                        <p className="mb-5"><b>Total:</b> ${totalCheckout()}</p>
                        <button type="submit" className="btn btn-sm absolute bottom-2 left-1/2 -translate-x-1/2 mt-50" onClick={()=>document.getElementById('CheckoutStatus').showModal()}>Enviar pago</button>
                    </form>
                </div>
            </div>
        </div>
        <dialog id="CheckoutStatus" className="modal">
        <div className="modal-box">
            {
                /*  ----- Mostrar mensaje de exito si la orden es exitosa ----- */
                orderStatus === 'success' ?
                <>
                <div role="alert" className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                <span>Tu compra ha sido confirmada!</span>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn" onClick={clearCart}>Aceptar</button>
                    </form>
                </div>
                </>
                :
                /*  ----- Mostrar mensaje de error si la orden falla ----- */
                orderStatus === 'error' ?
                <>
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                <span>Hubo un error al procesar la compra, por favor intente más tarde.</span>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Aceptar</button>
                    </form>
                </div>
                </>
                : null
            }
        </div>
        </dialog>
    </>
  )
}

export default CartModal
