import React, { useState } from "react";

export default function Categories({ categoriesList, setCategoryList }) {
  const recipeCategory = {
    dinner: "dinner",
    breakfast: "breakfast",
    // vegan: "vegan",
    // glutenFree: "gluten free",
  };

  const updateCategory = (checked, recipeCategory) => {
    if (checked) {
      setCategoryList([...categoriesList, recipeCategory]);
    } else {
      // unchecked
      const indexToBeRemoved = categoriesList.indexOf(recipeCategory);
      categoriesList.splice(indexToBeRemoved, 1);
    }
  };

  return Object.values(recipeCategory).map((recipeCategory) => (
    <CategoryCheckbox
      label={recipeCategory}
      handleCheck={(value) => updateCategory(value, recipeCategory)}
    />
  ));
}

function CategoryCheckbox({ label, handleCheck }) {
  const [checked, setChecked] = useState(false);

  const onClick = () => {
    setChecked(!checked);
    handleCheck(!checked);
  };

  return (
    <label>
      <input type="checkbox" value={checked} onClick={onClick} key={label} />
      {label}
    </label>
  );
}
