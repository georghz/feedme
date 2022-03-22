import React from "react";

export default function Categories({ categoriesList, setCategoryList, backgroundColor, color }) {
  const recipeCategory = {
    dinner: "Dinner",
    vegan: "Vegan",
    glutenfree: "Gluten free",
    breakfast: "Breakfast",
    lunch: "Lunch",
  };

  const updateCategory = (checked, recipeCategory) => {
    if (checked && !categoriesList.includes(recipeCategory)) {
      setCategoryList([...categoriesList, recipeCategory]);
    } else {
      // unchecked
      const updatedList = categoriesList.filter((c) => c !== recipeCategory);
      setCategoryList(updatedList);
    }
  };

  return Object.values(recipeCategory).map((recipeCategory, i) => (
    <CategoryCheckbox
      backgroundColor={backgroundColor}
      color={color}
      label={recipeCategory}
      handleCheck={(value) => updateCategory(value, recipeCategory)}
      isChecked={categoriesList.includes(recipeCategory)}
      key={i}
    />
  ));
}

function CategoryCheckbox({
  label,
  handleCheck,
  backgroundColor,
  color,
  isChecked,
}) {

  return (
    <label style={{ backgroundColor: backgroundColor, color: color }}>
      <input type="checkbox" checked={isChecked} onChange={handleCheck} key={label} />
      {label}
      <br />
    </label>
  );
}
