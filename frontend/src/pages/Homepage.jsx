import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Bell, BarChart3, Users, ArrowRight, Trash2, Shield, Truck } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: MapPin,
      title: 'Report Full Bins',
      description: 'Citizens can easily report overflowing waste bins with photos and GPS location.',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Collection teams receive SMS alerts when bins reach critical fill levels.',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: BarChart3,
      title: 'Live Dashboard',
      description: 'Real-time monitoring of all bins with interactive maps and analytics.',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Crowdsourced reporting combined with automated monitoring for maximum coverage.',
      color: 'bg-purple-50 text-purple-600',
    },
  ]

  const stats = [
    { value: '10,000+', label: 'Bins Monitored' },
    { value: '5,000+', label: 'Reports Submitted' },
    { value: '30%', label: 'Cost Reduction' },
    { value: '2hrs', label: 'Avg Response Time' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6">
              <Trash2 className="w-4 h-4" />
              Smart Urban Waste Management
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Keeping Our Cities<br />
              <span className="text-emerald-200">Clean & Sustainable</span>
            </h1>
            <p className="text-lg sm:text-xl text-emerald-100 mb-10 leading-relaxed">
              Waste-Watch is an intelligent web-based monitoring system that connects 
              citizens, collection teams, and administrators for efficient urban waste management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/report" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                <MapPin className="w-5 h-5" />
                Report a Bin
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 transition-colors border border-emerald-500">
                <Shield className="w-5 h-5" />
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-emerald-600">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our hybrid approach combines crowdsourced reporting with automated monitoring 
              for comprehensive waste management coverage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Join thousands of citizens helping to keep our city clean. 
            Report a full bin in just 30 seconds.
          </p>
          <Link 
            to="/report" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 transition-colors text-lg"
          >
            <Truck className="w-5 h-5" />
            Report a Bin Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}