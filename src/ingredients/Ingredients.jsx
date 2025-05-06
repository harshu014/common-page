import React, { useState } from 'react';
import './Ingredients.css';

const Ingredients = () => {
  const [dish, setDish] = useState('');
  const [ingredients, setIngredients] = useState([
    { name: '', quantity: 50 },
    { name: '', quantity: 50 },
    { name: '', quantity: 50 },
    { name: '', quantity: 50 }
  ]);

  const handleDishChange = (e) => {
    setDish(e.target.value);
  };

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index].name = e.target.value;
    setIngredients(newIngredients);
  };

  const handleQuantityChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = Math.max(0, newIngredients[index].quantity + value);
    setIngredients(newIngredients);
  };

  const addMoreIngredients = () => {
    setIngredients([...ingredients, { name: '', quantity: 50 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ dish, ingredients });
    // Handle form submission here
  };

  return (
    
    <div className="order-details-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Dish</label>
          {/* <input
            type="text"
            placeholder="Eg: Paneer Butter Masala"
            value={dish}
            onChange={handleDishChange}
            className="form-input"
          /> */}
          <select className='dish-select'>
            <option value="">Eg: Paneer Butter Masala</option>
            <option value="">Paneer Do Pyaza</option>
            <option value="">Handi Paneer</option>
          </select>
        </div>

        <div className="form-group">
          <label>Select Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <select
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                className="ingredient-select"
              >
                <option value="">Eg: Paneer </option>
                <option value="Paneer">Paneer</option>
                <option value="Tomato">Tomato</option>
                <option value="Onion">Onion</option>
                <option value="Spices">Spices</option>
              </select>

              {/* <div className="quantity-section"> */}
                <input className="quantity-section" placeholder='Quantity Eg: 50g'/>
                <div className="quantity-buttons">
                  {/* <button 
                    type="button" 
                    onClick={() => handleQuantityChange(index, -10)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleQuantityChange(index, 10)}
                    className="quantity-btn"
                  >
                    +
                  </button> */}
                </div>
              </div>
            // </div>
          ))}
        </div>

        <div className="button-row">
          <button 
            type="button" 
            onClick={addMoreIngredients}
            className="add-more-btn"
          >
            Add More
          </button>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Ingredients;