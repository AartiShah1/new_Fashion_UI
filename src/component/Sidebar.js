import React, { useState } from 'react';
import "../css/sidebar.css";
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaHome,
    FaBookReader
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/charts",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/user_cartdetail",
            name:"User Cartdetail",
            icon:<FaUserAlt/>
        },
        {
            path:"/inventory",
            name:"Inventory",
            icon:<FaRegChartBar/>
        },
        {
            path:"/userDetail_Handler",
            name:"User Handler",
            icon:<FaCommentAlt/>
        },
        {
            path:"/addProduct",
            name:"Add Product",
            icon:<FaShoppingBag/>
        },
        {
            path:"/product_list",
            name:"Product List",
            icon:<FaThList/>
        },
        {
            path:"/",
            name:"Home",
            icon:<FaHome/>
        },,
        {
            path:"/About",
            name:"About Us",
            icon:< FaBookReader/>
        },
    ]
    return (
       <>
    

     <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">AS Fashion</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
                
           </div>
          
           <main>{children}</main>

   
   
        </>
       
    );
};

export default Sidebar





// import React, { useState } from 'react';
// import {
//     FaTh,
//     FaBars,
//     FaUserAlt,
//     FaRegChartBar,
//     FaCommentAlt,
//     FaShoppingBag,
//     FaThList
// }from "react-icons/fa";
// import { NavLink } from 'react-router-dom';


// const Sidebar = ({children}) => {
//     const[isOpen ,setIsOpen] = useState(false);
//     const toggle = () => setIsOpen (!isOpen);
//     const menuItem=[
//         {
//             path:"/",
//             name:"Dashboard",
//             icon:<FaTh/>
//         },
//         {
//             path:"/about",
//             name:"About",
//             icon:<FaUserAlt/>
//         },
//         {
//             path:"/analytics",
//             name:"Analytics",
//             icon:<FaRegChartBar/>
//         },
//         {
//             path:"/comment",
//             name:"Comment",
//             icon:<FaCommentAlt/>
//         },
//         {
//             path:"/product",
//             name:"Product",
//             icon:<FaShoppingBag/>
//         },
//         {
//             path:"/productList",
//             name:"Product List",
//             icon:<FaThList/>
//         }
//     ]
//     return (

//         <>
//          {/* <div className="container">
//            <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
//                <div className="top_section">
//                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
//                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
//                        <FaBars onClick={toggle}/>
//                    </div>
//                </div>
//                {
//                    menuItem.map((item, index)=>(
//                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
//                            <div className="icon">{item.icon}</div>
//                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
//                        </NavLink>
//                    ))
//                }
//            </div>
//            <main>{children}</main>
//         </div> */}


//            <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
//                <div className="top_section">
//                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
//                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
//                        <FaBars onClick={toggle}/>
//                    </div>
//                </div>
//                {
//                    menuItem.map((item, index)=>(
//                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
//                            <div className="icon">{item.icon}</div>
//                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
//                        </NavLink>
//                    ))
//                }
           
//            <main>{children}</main>
//         </div>

//         <div className="aarti">
//             <p>its me aarti</p>
//         </div>
        
//         </>
       

        
//     );
// };

// export default Sidebar;


// Sidebar.js

// import React, { useState } from 'react';
// import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag, FaThList } from "react-icons/fa";
// import { NavLink } from 'react-router-dom';

// const Sidebar = ({ children }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggle = () => setIsOpen(!isOpen);

//     const menuItem = [
//         { path: "/", name: "Dashboard", icon: <FaTh /> },
//         { path: "/about", name: "About", icon: <FaUserAlt /> },
//         { path: "/analytics", name: "Analytics", icon: <FaRegChartBar /> },
//         { path: "/comment", name: "Comment", icon: <FaCommentAlt /> },
//         { path: "/product", name: "Product", icon: <FaShoppingBag /> },
//         { path: "/productList", name: "Product List", icon: <FaThList /> }
//     ];

//     return (
//         <div className="container">
//             <div className="sidebar" style={{ width: isOpen ? "200px" : "50px" }}>
//                 <div className="top_section">
//                     <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
//                     <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
//                         <FaBars onClick={toggle} />
//                     </div>
//                 </div>
//                 {
//                     menuItem.map((item, index) => (
//                         <NavLink to={item.path} key={index} className="link" activeClassName="active">
//                             <div className="icon">{item.icon}</div>
//                             <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
//                         </NavLink>
//                     ))
//                 }
//             </div>

//             <main>{children}</main>

//             <div className="lorem">
//                 <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;



