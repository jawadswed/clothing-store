import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {

    const { cartItems, cartTotal } = useContext(CartContext);
    const { removeItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext);


    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>    
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <Total as='span'>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    );
};

export default Checkout;
