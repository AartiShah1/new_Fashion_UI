import "../global/cartreducer.css"
export const CartReducer=(state, action)=>{
    const {shoppingCart, totalPrice, totalQnty} = state;
    
    let product;
    let index;
    let updatePrice;
    let updateQnty;
    
    switch(action.type){
        case 'ADD_TO_CART':
            console.log('action',action.product)
            const check=shoppingCart.find(product=>product.id === action.product.id);

        if(check){
            console.log('Product is already in cart');
            return state;
        }
        else{
            product=action.product;
            product['qty']=1;
            product['TotalProductPrice']=Number(product.product_price)*Number(product.qty);
            updateQnty=Number(totalQnty)+1;
            updatePrice=Number(totalPrice)+Number(product.product_price);
            return{
                shoppingCart:[product,...shoppingCart],
                totalPrice:updatePrice,
                totalQnty:updateQnty            
            }
        }
        case 'INC':
            product = action.cart;
            product.qty = ++product.qty;
            product.TotalProductPrice=Number(product.qty)*Number(product.product_price);
            updateQnty=Number(totalQnty) + 1;
            updatePrice=Number(totalPrice) + Number(product.product_price);
            index=shoppingCart.findIndex(cart => cart.id === action.id);
            shoppingCart[index]=product;
            return{
                shoppingCart:[...shoppingCart],totalPrice:updatePrice,totalQnty:updateQnty
            }
        case 'DEC':
            product = action.cart;
            if(product.qty>1){
                product.qty=Number(product.qty)-1;
                product.TotalProductPrice=Number(product.qty)*Number(product.product_price);
                updatePrice=Number(totalPrice)-Number(product.product_price);
                updateQnty=Number(totalQnty)-1;
                index=shoppingCart.findIndex(cart=> cart.id===action.id);
                shoppingCart[index]=product;
                return{
                shoppingCart:[...shoppingCart],totalPrice:updatePrice,totalQnty:updateQnty
                }
            } 
            else{
                return state;
            }
        case 'DELETE':
            const filtered=shoppingCart.filter(product => product.id !== action.id);
            product=action.cart;
            updateQnty=Number(totalQnty)-Number(product.qty);
            updatePrice=Number(totalPrice)-Number(product.qty) * Number(product.product_price);
            return{
                shoppingCart:[...filtered], totalPrice:updatePrice, totalQnty:updateQnty
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        default:
            return state;
    }
}