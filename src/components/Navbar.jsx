import Logo from './Logo';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <span className="text-xl font-bold ml-2">Student AI Tools</span>
        </div>
        <div className="flex space-x-4">
          {/* Remove SignIn component */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 