import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function IndividualMeal() {
  const params = useParams();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`
      );
      setCategories(res.data.meals);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(categories);
  return (
    <div>
      {categories.map((item) => (
        <div key={item.idMeal}>
          <h3>{item.strMeasure2}</h3>
          <img src={item.strMealThumb} alt={item.strMeal} />
        </div>
      ))}
    </div>
  );
}
export default IndividualMeal;
