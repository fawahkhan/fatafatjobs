import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Fatafat</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Press & News</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Partnerships</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Community Hub</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Events</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Help & Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Trust & Safety</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Selling on Fatafat</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Buying on Fatafat</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Fatafat.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;