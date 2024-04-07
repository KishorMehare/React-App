import {useEffect, useState} from 'react';
import logo from '../logo.svg';
const Header = ({setSelectedCategory, selectedCategory}) =>{
const [data, setData] = useState([]);
useEffect(() => {
    fetch('http://localhost:3300/movies/categories')
        .then(res=>res.json())
        .then(json=>setData(json))
    })
    return  (
        <div className="header-items">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            {data.map((category) => (
                <div onClick={()=> setSelectedCategory(category)} 
                className={ 
                    "header-item " + 
                    (category===selectedCategory ? "header-item--selected" : "")
                    }
                    >
                    {category}
                </div>
              ))}
        </div>
    );
};
export default Header;