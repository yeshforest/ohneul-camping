import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import Gnb from "./Gnb";
import { menus } from "../constants/headerMenus";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

const Header = () => {
  const { isLoggedIn, resetUser } = useUserStore();
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0); // 마지막 스크롤 위치를 저장하는 state
  const imgPath = useUserStore((state) => state.profileImg);
  const handleLogout = () => {
    resetUser();
    useUserStore.persist.clearStorage();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // 스크롤이 아래로 진행되었는지 확인
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY); // 마지막 스크롤 위치 업데이트
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 클린업 함수에서 이벤트 리스너 제거
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); // lastScrollY가 변경될 때마다 useEffect가 실행됩니다.

  return (
    <motion.header
      animate={(showNav) => ({
        y: showNav ? 0 : -137,
        transition: { duration: 0.3 },
      })}
      custom={showNav}
      className={`header`}
    >
      <Logo />
      <div className="header__inner">
        <Gnb menus={menus} />
        <button
          className="header__auth-btn"
          onClick={() => {
            isLoggedIn ? navigate("/my") : navigate("/Login");
          }}
        >
          {isLoggedIn ? (
            <img
              className="header__img-path"
              src={imgPath === null ? "/src/images/ico_profile.svg" : imgPath}
            />
          ) : (
            <span className="gnb__item-text">로그인/회원가입</span>
          )}
        </button>
        {isLoggedIn && (
          <button onClick={handleLogout}>
            <span className="gnb__item-text">로그아웃</span>
          </button>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
