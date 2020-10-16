import React, { useContext, useState } from "react";
import { useActiveWeb3React } from "../../web3";
import { formatAddress, formatAmount } from "../../utils/format";
import { mainContext } from "../../reducer";
import { HANDLE_SHOW_CONNECT_MODAL } from "../../const";
import { Link, NavLink, useLocation } from "react-router-dom";

import { Logoicon, LogoSmallIcon } from "../../icons";
import { useGLFBalance } from "../../pages/Hooks";

export const Header = () => {
    const { active, account, library, chainId } = useActiveWeb3React();
    const { dispatch } = useContext(mainContext);

    const [showMenu, setShowMenu] = useState(false);
    const { glfBalance } = useGLFBalance();
    const location = useLocation();

    const handleMenuItemClick = () => {
        setShowMenu(false);
    };

    return (
        <header
            className={`header ${showMenu ? "menu-show" : ""}`}
            style={location.pathname === "/" ? { borderBottom: "transparent" } : {}}
        >
            <div className="center">
                <div className="header__box">
                    <Link to="/" className="header__logo">
                        <Logoicon />
                    </Link>

                    <Link
                        to="/"
                        className={`header__logo--small ${active ? "active" : ""}`}
                    >
                        <LogoSmallIcon />
                    </Link>

                    <div className="header__menu-wrapper">
                        <div className="header__menu">
                            <nav className="menu">
                                <ul className="menu__list">
                                    <li className="menu__item">
                                        <NavLink
                                            to="/about"
                                            className="menu__link"
                                            activeClassName="is-current"
                                            onClick={handleMenuItemClick}
                                        >
                                            About
                                        </NavLink>
                                    </li>
                                    <li className="menu__item">
                                        <NavLink
                                            to="/workshop"
                                            className="menu__link"
                                            activeClassName="is-current"
                                            onClick={handleMenuItemClick}
                                        >
                                            Workshop
                                        </NavLink>
                                    </li>
                                    <li className="menu__item">
                                        <NavLink
                                            to="/auction"
                                            className="menu__link"
                                            activeClassName="is-current"
                                            onClick={handleMenuItemClick}
                                        >
                                            Auction
                                        </NavLink>
                                    </li>
                                    <li className="menu__item">
                                        <NavLink
                                            to="/exhibition-hall"
                                            className="menu__link"
                                            activeClassName="is-current"
                                            onClick={handleMenuItemClick}
                                        >
                                            Exhibition hall
                                        </NavLink>
                                    </li>
                                    <li className="menu__item">
                                        <NavLink
                                            to="/pools"
                                            className="menu__link"
                                            activeClassName="is-current"
                                            onClick={handleMenuItemClick}
                                        >
                                            Pools
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        {!active && (
                            <div className="header__btn">
                                <div className="buttonContainer">
                                    <button
                                        onClick={() => {
                                            dispatch({
                                                type: HANDLE_SHOW_CONNECT_MODAL,
                                                showConnectModal: true
                                            });
                                        }}
                                        className="btn"
                                        type="button"
                                        data-modal="recieve"
                                    >
                                        <span onClick={() => {}}>Unlock Wallet</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {active && (
                            <div className="header-account">
                                <div className="balance">
                                    {/* <p>{glfBalance? formatAmount(glfBalance): 0} GLF</p> */}
                                    <p>0.042657 GLF</p>
                                </div>
                                <div className="address">
                                    0x0659..1FA
                                    {/* {formatAddress(account)} */}
                                    <div className="point"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="visible-md">
                    <button
                        className="button btn-menu-toggle"
                        type="button"
                        onClick={() => setShowMenu(prev => !prev)}
                    >
                        Menu
                    </button>
                </div>
            </div>
        </header>
    );
};
