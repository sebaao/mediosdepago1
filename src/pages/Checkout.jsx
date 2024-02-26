import { PayPalButtons } from "@paypal/react-paypal-js"
import { CheckoutProductList } from "../components/CheckoutProductList"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";
import { useEffect, useState } from "react";
initMercadoPago('TEST-e15adb22-1da9-4d47-8bf7-078408ba1e07');


export const Checkout = () => {

  const [preferenceId, setPreferenceId] = useState(null)



  const productosGenialesQueEstoyVendiendo = [
    {
      id: 1,
      nombre: "Producto Genial 1",
      precio: 25,
      cantidad: 1
    },
    {
      id: 2,
      nombre: "Producto Genial 2",
      precio: 75,
      cantidad: 3
    },
    {
      id: 3,
      nombre: "Producto Genial 3",
      precio: 50,
      cantidad: 4
    }
  ]

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: productosGenialesQueEstoyVendiendo.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
          }
        }
      ]
    })
  }

  const onApprove = async (data, actions) => {
    alert("Pago aprobado")
    const enviarOrden = await actions.order.capture()
    console.log(enviarOrden)
  }

  const obtenerPreferenceId = async () => {
    const data = await axios.post ("http://localhost:8080/create-preference", {})
    console.log (data)
    setPreferenceId (data.data.id)
  }

  useEffect (() => {
    obtenerPreferenceId ()
  }, [])


  return (
    <>
      <h2>Checkout Page</h2>

      <ul>
        {
          productosGenialesQueEstoyVendiendo.map((producto) => (
            <CheckoutProductList
              key={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              cantidad={producto.cantidad}
            />
          ))
        }
      </ul>

      <h3>Total: $ {productosGenialesQueEstoyVendiendo.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)}</h3>


      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(error) => console.log(error)}
        onCancel={(data) => console.log(data)}
      />

      <Wallet initialization={{ preferenceId: preferenceId }} 
              customization={{ texts: { valueProp: 'smart_option' } }} />


    </>
  )
}
