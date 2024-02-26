export const CheckoutProductList = ({nombre, precio, cantidad}) => {
    return (
      <div>
        <p>{nombre}</p>
        <h4>${precio * cantidad}</h4>
      </div>
    )
  }