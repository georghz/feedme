import React from "react";

export default function Categories({ categories, setCategories }) {
  const [dinnerChecked, setDinnerChecked] = React.useState(false);
  const [breakfastChecked, setBreakfastChecked] = React.useState(false);

  const handleDinnerChange = () => {
    setDinnerChecked(!dinnerChecked);
  };

  const handleBreakfastChecked = () => {
    setBreakfastChecked(!breakfastChecked);
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
}

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
