
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-darkGray text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Questify</h3>
            <p className="text-gray-300 text-sm">
              A community-based platform for asking and answering programming questions. Get help, share knowledge, and collaborate.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-brand-orange">Home</Link></li>
              <li><Link to="/questions" className="hover:text-brand-orange">Questions</Link></li>
              <li><Link to="/tags" className="hover:text-brand-orange">Tags</Link></li>
              <li><Link to="/users" className="hover:text-brand-orange">Users</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/help" className="hover:text-brand-orange">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-brand-orange">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-brand-orange">About</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-orange">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/blog" className="hover:text-brand-orange">Blog</Link></li>
              <li><Link to="/rules" className="hover:text-brand-orange">Community Rules</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange">GitHub</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© 2025 Questify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
