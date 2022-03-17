import React, { useState } from "react";

export default function Categories({ categoriesList, setCategoryList }) {
  //Working code

  /* const [dinnerChecked, setDinnerChecked] = React.useState(false);
  const [breakfastChecked, setBreakfastChecked] = React.useState(false);
  const [categoriesChecked, setCategoriesChecked] = useState([]);

  const handleDinnerChange = () => {
    setDinnerChecked(!dinnerChecked);
    if (!dinnerChecked) {
      categoriesList.push("dinner");
    } else {
      const index = categoriesList.indexOf("dinner");
      categoriesList.splice(index, 1);
    }
  };

  const handleBreakfastChecked = () => {
    setBreakfastChecked(!breakfastChecked);
    if (!breakfastChecked) {
      categoriesList.push("breakfast");
    } else {
      const index = categoriesList.indexOf("breakfast");
      categoriesList.splice(index, 1);
    }
  };

  const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

  return (
    <div>
      <Checkbox
        label="Dinner"
        value={dinnerChecked}
        onChange={handleDinnerChange}
      />
      <br />
      <Checkbox
        label="Breakfast"
        value={breakfastChecked}
        onChange={handleBreakfastChecked}
      />
    </div>
  );
}*/

  // Not working, but trying to get this to work. This code is on a cleaner format

  const recipeCategory = {
    dinner: "dinner",
    breakfast: "breakfast",
    // vegan, gluten free ++
  };

  const handleCheck = (checked, recipeCategory) => {
    if (checked) {
      setCategoryList([...categoriesList, recipeCategory]);
    } else { // unchecked
      const index = categoriesList.indexOf(recipeCategory);
      setCategoryList(categoriesList.splice(index, 1));
    }
  };

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };
  
return (
    recipeCategory.map(recipeCategory => (
      <Checkbox
        label={recipeCategory}
        onChange={(value) => handleCheck(value, recipeCategory)}
      /> ))
  );
}
