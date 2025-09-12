import { CreditCard, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-blue-400" />
                <span className="font-semibold text-white">Credit Predictor</span>
              </div>
              <p className="text-sm text-slate-400">
                Advanced AI-powered credit card approval prediction using state-of-the-art machine learning models.
              </p>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/prediction" className="hover:text-white transition-colors">
                    Prediction Tool
                  </a>
                </li>
                <li>
                  <a href="/analysis" className="hover:text-white transition-colors">
                    Model Analysis
                  </a>
                </li>
                <li>
                  <a href="/help" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Models */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">ML Models</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-slate-400">Logistic Regression</li>
                <li className="text-slate-400">Decision Tree</li>
                <li className="text-slate-400">Random Forest</li>
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Connect</h3>
              <div className="flex gap-3">
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 Credit Predictor. Built with AI for better financial decisions.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
