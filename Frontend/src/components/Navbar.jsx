import { NavLink } from "react-router";
import { useLocation } from "react-router";
import { cn } from "../lib/utils";

const NavItem = ({ path = "/", end = true, children }) => {
    const location = useLocation();
    return (
        <NavLink
            className={cn(
                " text-white rounded-[10px] p-2",
                location.pathname == path ? "bg-gray-500" : "bg-gray-700",
                "hover:bg-cyan-500/50",
            )}
            to={path}
            end={end}
        >
            {children}
        </NavLink>
    );
};

export function Navbar() {
    return (
        <nav className="flex justify-center gap-1 bg-gray-800 p-2">
            <NavItem path="/">Home</NavItem>
            <NavItem path="/trending" end>
                Trending
            </NavItem>
        </nav>
    );
}
