import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../Utils'; 

const navigation = [
  {
    // title: "DashBoard",
    title: "HomePage",
    href: "/homepage",
    icon: "bi bi-speedometer2",
  },
  {
    // title: "Alert",
    title: "My Account",
    // href: "/alerts",
    href: "/myAccount",
    icon: "bi bi-bell",
  },
  {
    // title: "Badges",
    title: "Change Password",
    // href: "/badges",
    href: "/changePassword",
    icon: "bi bi-patch-check",
  },
  {
    // title: "Buttons",
    title: "Profit&Loss",
    // href: "/buttons",
    href: "/profitAndLoss",
    icon: "bi bi-hdd-stack",
  },
  {
    // title: "Cards",
    title: "Earnings",
    // href: "/cards",
    href: "/earnings",
    icon: "bi bi-card-text",
  },
  // {
  //   title: "Grid",
  //   href: "/grid",
  //   icon: "bi bi-columns",
  // },
  // {
  //   title: "Table",
  //   href: "/table",
  //   icon: "bi bi-layout-split",
  // },
  // {
  //   title: "Forms",
  //   href: "/forms",
  //   icon: "bi bi-textarea-resize",
  // },
  // {
  //   title: "Breadcrumbs",
  //   href: "/breadcrumbs",
  //   icon: "bi bi-link",
  // },
  // {
  //   title: "About",
  //   href: "/about",
  //   icon: "bi bi-people",
  // },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const userId = getUserId();
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  const handleLogout = () => {

    // Cookies.remove(userId,{ path: '/' }); // Remove user_id from cookies
    console.log("jghjghkj");
    navigate('/login');
  }

  return (
    <div className="con p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
