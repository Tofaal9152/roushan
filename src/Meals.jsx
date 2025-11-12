import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Meals() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
      );
      setCategories(res.data.meals);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      Meals
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {categories.map((item, index) => (
          <Link
            to={`/meals/${item.idMeal}`}
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <h3>{item.strMeal}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Meals;
