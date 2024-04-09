import { useContext, useEffect, useState } from "react";

import { IoMoon } from "react-icons/io5";
import Switch from "react-switch";
import { ThemeDataContext } from "./Theme";

const Toggle = () => {
  const theme = useContext(ThemeDataContext);

  const [checked, setChecked] = useState(localStorage.getItem("theme")=="true");

  const handleChange = () => {
    const nextTheme =!checked;
    setChecked(nextTheme);
    theme.setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };
  useEffect(() => {
    // Retrieve theme value from localStorage and update checked state
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setChecked(storedTheme === "true"); // Convert the string to boolean
    }
  }, []);
  return (
    <label htmlFor="small-radius-switch">
      <Switch
        checked={checked}
        onChange={handleChange}
        handleDiameter={28}
        offColor="#ffffff"
        onColor="#87CEEB"
        offHandleColor="#0ff"
        onHandleColor="#08f"
        height={30}
        width={60}
        borderRadius={30}
        activeBoxShadow="0px 0px 1px 2px #fffc35"
        uncheckedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 15,
              color: "orange",
            }}
          >
            <IoMoon size={15} />
          </div>
        }
        checkedIcon={
          <svg viewBox="0 0 10 10" height="100%" width="100%" fill="yellow">
            <circle r={3} cx={5} cy={5} />
          </svg>
        }
        uncheckedHandleIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 15,
            }}
          ></div>
        }
        checkedHandleIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "red",
              fontSize: 15,
            }}
          ></div>
        }
        className="react-switch"
        id="small-radius-switch"
      />
    </label>
  );
};

export default Toggle;
