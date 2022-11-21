import {
  ArchiveIcon,
  ArrowBack,
  ExitMarkIcon,
  HamburgerIcon,
  LogoutIcon,
  TrashIcon,
  UserIcon,
} from "../images/icons/icons";
import { useNavigate } from "react-router-dom";
import { ExitSiteMesssage } from "./exitSite";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Notes from "./noteCreate";
import NotesCharge from "./notesCharge";

const NavBar = () => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  function classes(): string {
    return width < 1024
      ? "hidden"
      : "fixed flex items-center rounded-2xl dropdown h-20 px-8 bg-base-300 dropdown z-2 mt-4 mr-4 right-0 dropdown-end z-50";
  }

  return (
    <>
      <div className={classes()} tabIndex={0}>
        <div className="flex gap-2 cursor-pointer">
          <label className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" />
            </div>
          </label>
          <span className="text-start ">
            <span className="text-lg">Pedrolas</span>
            <p className="text-xs capitalize">Desenvolvedor</p>
          </span>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52 lg:mt-52"
        >
          <li>
            <a onClick={() => navigate("/profile")}>
              <UserIcon />
              Perfil
            </a>
          </li>
          <li>
            <label htmlFor="exit-site">
              <LogoutIcon />
              Sair
            </label>
          </li>
        </ul>
      </div>

      <ExitSiteMesssage htmlFor="exit-site" />
      <div className="drawer">
        <input id="menu-lateral" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col p-4 xl:items-center">
          <div className="bg-base-200 p-1 rounded-full xl:w-1/3">
            <div className="flex gap-2">
              <label
                htmlFor="menu-lateral"
                className="btn rounded-full p-0 w-full max-w-[3rem] h-auto max-h-12 min-h-0 drawer-button"
              >
                <HamburgerIcon />
              </label>
              <input
                type="text"
                placeholder="Toque para filtrar notas"
                className="input input-sm px-2 w-full rounded-full bg-base-200 transition-all focus:input-md focus:bg-base-100 focus:outline-none active:outline-none active:outline-0"
              />
            </div>
          </div>
        <NotesCharge />
        </div>
        <div className="drawer-side">
          <label htmlFor="menu-lateral" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li className="items-end mb-10">
              <label htmlFor="menu-lateral">
                <a>
                  <ExitMarkIcon />
                </a>
              </label>
            </li>
            <li>
              <a onClick={() => navigate("/home")}>
                <ArrowBack />
                Home
              </a>
            </li>
            <li>
              <a>
                <ArchiveIcon />
                Arquivo
              </a>
            </li>
            <li>
              <a>
                <TrashIcon />
                Lixeira
              </a>
            </li>
            <li className="mt-auto">
              <a
                className="dropdown dropdown-top z-50 active:!bg-[#c2d0ea1a] active:text-[#c2d0ea]"
                tabIndex={0}
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <span className="text-start">
                  <span className="text-lg">Rafael</span>
                  <p className="text-xs capitalize">Desenvolvedor</p>
                </span>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52 lg:mt-52"
                >
                  <li>
                    <a onClick={() => navigate("/profile")}>
                      <UserIcon />
                      Perfil
                    </a>
                  </li>
                  <li>
                    <label htmlFor="exit-site">
                      <a className="flex items-center gap-3">
                        <LogoutIcon />
                        Sair
                      </a>
                    </label>
                  </li>
                </ul>
              </a>
            </li>
          </ul>
        </div>
        <Notes />
      </div>
    </>
  );
};

export default NavBar;
