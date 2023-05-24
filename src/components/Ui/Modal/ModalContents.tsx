import { useRecoilValue } from "recoil";
import { ColumnState } from "../../../atoms";

import Switch from "../UiComponents/Switch";
import { useState } from "react";

export const AddContent = () => {
  const coulmns = useRecoilValue(ColumnState);
  const [value, setValue] = useState(false);
  const ToggleHanddler = () => {
    setValue((prev) => {
      return !prev;
    });
  };

  return (
    <div>
      <h1>Settings</h1>
      <Switch isOn={value} handleToggle={ToggleHanddler} />
    </div>
  );
};
