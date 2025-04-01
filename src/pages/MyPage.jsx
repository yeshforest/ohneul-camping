import MyPageAside from "../components/MyPageAside";
import MyPageContentLayout from "../layout/MyPageContentLayout";
import myPageTitleStore from "../store/mypageTitleStore";

const MyPage = () => {
  const { title } = myPageTitleStore();

  const menus = [
    {
      title: "예약 현황",
      link: "reservation",
    },
    {
      title: "정보 변경",
      link: "account",
    },
    {
      title: "장바구니",
      link: "cart",
    },
  ];
  return (
    <section className="mypage">
      <div className="mypage__title">{title}</div>
      <hr className="mypage__hr" />
      <div className="mypage__inner">
        <MyPageAside menus={menus} />
        <MyPageContentLayout />
      </div>
    </section>
  );
};
export default MyPage;
