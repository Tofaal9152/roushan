import { useEffect, useState } from "react";
import axios from "axios";
import Meals from "./Meals";
import { Link } from "react-router-dom";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Link to="/meals">Go to Meals Page</Link>
      <Meals />
      {categories.map((item, index) => (
        <div key={index}>
          <h3>{item.strCategory}</h3>
          <img src={item.strCategoryThumb} alt={item.strCategory} />
          <p>{item.strCategoryDescription}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
