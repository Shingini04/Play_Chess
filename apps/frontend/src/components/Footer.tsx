import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-40 py-16 text-gray-400">
      <div className="w-[96%] max-w-screen-lg mx-auto flex flex-col items-center justify-center">
        <div>
          <Link to={"/"}>Home</Link> |
          <Link to={"/settings"}> Settings</Link> |
          <Link to={"/login"}> Login</Link> |
          <Link to={"/game/random"}> Play</Link>
        </div>
      </div>
    </footer>
  );
};
