import * as React from "react";
import { useLocation, useNavigate, Outlet, Link } from "react-router-dom";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";

export const items = [
  {
    text: "Dashboard",
    selected: true,
    route: "/home/dashboard",
    icon: "k-i-grid",
  },
  {
    text: "About",
    selected: false,
    route: "/home/about",
    icon: "k-icon k-i-reset",
  },
  {
    text: "Blog",
    selected: false,
    route: "/home/blog",
    icon: "k-icon k-i-pencil",
  },
  {
    text: "Experience",
    selected: false,
    route: "/home/experience",
    icon: "k-icon k-i-window-restore",
  },
  {
    text: "Products",
    selected: false,
    route: "/home/products",
    icon: "k-icon k-i-aggregate-fields",
  },
  { separator: true },
  {
    text: "Settings",
    selected: false,
    route: "/home/account",
    icon: "k-icon k-i-gear",
  },
];

export const DrawerContainer = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(true);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const onSelect = (e) => {
    navigate(e.itemTarget.props.route);
  };

  const setSelectedItem = (pathName) => {
    let currentPath = items.find((item) => item.route === pathName);
    if (currentPath.text) {
      return currentPath.text;
    }
  };

  const selected = setSelectedItem(location.pathname);

  return (
    <div>
      <div className="custom-toolbar">
        <Button
          icon="menu"
          onClick={handleClick}
          style={{ fontSize: "35px", marginBottom: "10px" }}
        />
        <span className="overview">
          {selected === "Dashboard" ? "Overview" : selected}
        </span>
        <span style={{ marginLeft: "600px",fontSize:"30px" }}>Codebuster</span>
        <div className="right-widget">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              className="user-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              style={{
                fontSize: "20px",
                backgroundColor: "orangered",
                color: "white",

                padding: "10px",
                borderRadius: "10px",
              }}
            >
              Sign Out
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <Drawer
          expanded={expanded}
          position="start"
          mode="push"
          width={240}
          items={items.map((item) => ({
            ...item,
            selected: item.text === selected,
          }))}
          onSelect={onSelect}
          className="drawer"
        >
          <DrawerContent className="drawer-content">
            {props.children}
            <Outlet />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
