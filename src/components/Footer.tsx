import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Pham Thanh Truong</h3>
            <p className="text-muted-foreground text-sm">
              Software Developer với 3 năm kinh nghiệm trong phát triển web và mobile 
              sử dụng React, React Native, và Next.js.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Work Experience
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/cv" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  My CV
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📧 thanhtruongdn@gmail.com</p>
              <p>📱 (+84) 382 848 272</p>
              <p>📍 Da Nang City, Viet Nam</p>
              <div className="flex space-x-4 pt-2">
                <Link 
                  href="https://github.com/Pham-Thanh-Truong" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>
                <Link 
                  href="https://onlyfansthomasdev.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Pham Thanh Truong. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">
              Built with Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
