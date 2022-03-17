import React from "react";
import "./Sidebar.css";

export default function Sidebar({ recipesList, setRecipeList }) {
  const [dinnerChecked, setDinnerChecked] = React.useState(false);

  const handleDinnerChange = () => {
    console.log(recipesList);
    setDinnerChecked(!dinnerChecked);
    setRecipeList([]);
    // recipesList = [];
    // console.log(recipesList)
    // console.log("anine");
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
    <div className="hei">
      <div>
        <Checkbox
          label="Dinner"
          value={dinnerChecked}
          onChange={handleDinnerChange}
        />
      </div>
    </div>
  );
}
