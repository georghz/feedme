import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/theme";

export default function Categories({ categoriesList, setCategoryList, backgroundColor, color }) {
  const [{ theme }] = useContext(ThemeContext);
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

  return Object.values(recipeCategory).map((recipeCategory) => (
    <CategoryCheckbox
      backgroundColor={backgroundColor}
      color={color}
      label={recipeCategory}
      handleCheck={(value) => updateCategory(value, recipeCategory)}
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
  const [checked, setChecked] = useState(isChecked);

  const onClick = () => {
    setChecked(!checked);
    handleCheck(!checked);
  };

  return (
    <label style={{ backgroundColor: backgroundColor, color: color }}>
      <input type="checkbox" value={checked} onClick={onClick} key={label} />
      {label}
      <br />
    </label>
  );
}
