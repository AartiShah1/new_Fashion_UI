import React, {createContext} from "react";
import axios from "axios";

export const ProductContext = createContext();
export class ProductContextProvider extends React.Component{
  //defining an initial state
  state={
    products:[]
}

componentDidMount  = async() => {
    var result = await axios.get("http://localhost:4500/product/getallProducts");
    // //use axios insted of above functions
    console.log(result, 'result');// check and try result.data.map 
    const finalData = result.data.map((doc) => ({
        id: doc.id,
        ...doc,
        }));
        console.log(finalData,'finaldata')
    this.setState({
        products: finalData
    });
}

render(){
    return(
        <ProductContext.Provider value={{products:{...this.state.products}}}>
            {this.props.children}
        </ProductContext.Provider>
    )
}

}