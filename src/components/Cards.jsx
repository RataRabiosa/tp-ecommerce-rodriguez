import React, { useState } from 'react'

const Cards = ({id, title, description, price, image, onClick}) => {

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="card bg-base-100 w-96 shadow-sm m-4">
      <figure className="px-10 pt-10">
        <img
          src={image}
          alt={title}
          className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p><b>${price}</b></p>
        <p>{description}</p>
        <div className="card-actions">
          <label className="select select-sm">
            <span className="label">Cantidad</span>
            <select defaultValue="Pick a color" onChange={(e) => setQuantity(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="btn btn-primary" onClick={() => onClick(id,title,price,quantity,image)}>Añadir al carrito</button>
      </div>
    </div>
  )
}

export default Cards