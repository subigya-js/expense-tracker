import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Expense Tracker. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4 text-sm">
            Made with ❤️ by SUBIGYA SUBEDI
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
