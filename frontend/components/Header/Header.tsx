import Auth from "./Auth";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="py-3">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <Logo />
        <Auth />
      </div>
    </header>
  );
};
export default Header;
