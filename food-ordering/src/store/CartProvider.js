import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    // Here we are using concat to add new item in an array and we are using concat because it will add a new item to a new array whereas push adds new item to the old existing array which changes the original array

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price
    let updatedItems;
    if(existingItem.amount === 1){
        updatedItems = state.items.filter((item) => item.id !== action.id)
    }
    else{
        const updatedItem = {...existingItem, amount: existingItem.amount - 1}
        updatedItems = [...state.items]
        updatedItems[existingItemIndex] = updatedItem;
    }
    return{
        items: updatedItems,
        totalAmount: updatedTotalAmount
    }
  }
  return defaultCart;
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCart);

  const addItemsToCart = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemsFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItems: addItemsToCart,
    removeItems: removeItemsFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
