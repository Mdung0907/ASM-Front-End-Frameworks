import { Table } from "react-bootstrap";
import { CartContext } from "./context";

const CartList = ({ carts }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {carts?.items?.length &&
          carts.items.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={`${item.image}`} alt="" style={{ width: 100 }} />
              </td>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td>
            SUM: <span>${carts.sum}</span>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};
export default CartList;