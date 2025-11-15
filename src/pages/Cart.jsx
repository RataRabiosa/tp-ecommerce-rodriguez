import React from 'react'

const Cart = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-base-300">
            <th>
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  {/*<img src={img} alt={title} />*/}
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
                        alt="Tailwind-CSS-Avatar-component"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          <tr className="hover:bg-base-300">
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          <tr className="hover:bg-base-300">
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Cart