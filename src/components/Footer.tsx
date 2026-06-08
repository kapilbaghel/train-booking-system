export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-orange-500">
              Train Booking
            </h2>

            <p className="mt-3 text-gray-400 text-sm">
              Book train tickets quickly and easily with our platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-orange-500 transition cursor-pointer">
                Home
              </li>
              <li className="hover:text-orange-500 transition cursor-pointer">
                Search Trains
              </li>
              <li className="hover:text-orange-500 transition cursor-pointer">
                Popular Routes
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              Contact
            </h3>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>support@trainbooking.com</li>
              <li>+91 9870098700</li>
              <li>India</li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-orange-500/20 text-center py-4 px-4 text-gray-500 text-sm">
        © 2026 Train Booking System. All rights reserved.
      </div>
    </footer>
  );
}