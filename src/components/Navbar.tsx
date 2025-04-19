import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo (replace with your actual logo) */}
        <Link href="/" className="text-2xl font-bold">
          MyLogo
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component for consistent styling
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <Link 
      href={href}
      className="hover:text-blue-300 hover:underline transition-colors duration-200"
    >
      {children}
    </Link>
  );
};

export default Navbar;