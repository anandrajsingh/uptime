'use client'
import { useRouter } from "next/navigation";
import { Activity, Shield, Clock, Bell, CheckCircle, Server, ArrowRight, Globe } from 'lucide-react';

export default function Home() {

  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login")
  }

  const handleSignUpClick = () => {
    router.push("/signup")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-violet-300">
      {/* Hero Section */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Uptime</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          </div>
          <button onClick={handleLoginClick} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Login
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Monitor Your Website&apos;s Uptime with Confidence
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Get instant notifications when your websites go down. Monitor performance, uptime, and stay ahead of issues before they impact your users.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={handleSignUpClick} className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
              <span>Start Monitoring</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            {/* <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors">
              View Demo
            </button> */}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24" id="features">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need for reliable monitoring
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools to keep your websites running smoothly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Globe className="h-8 w-8 text-indigo-600" />}
              title="Global Monitoring"
              description="Monitor from multiple locations worldwide for accurate uptime tracking"
            />
            <FeatureCard
              icon={<Bell className="h-8 w-8 text-indigo-600" />}
              title="Instant Alerts"
              description="Get notified immediately via SMS, email, or Slack when issues arise"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-indigo-600" />}
              title="24/7 Monitoring"
              description="Round-the-clock monitoring to catch issues at any time"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-indigo-600" />}
              title="SSL Monitoring"
              description="Track SSL certificate expiration and security status"
            />
            <FeatureCard
              icon={<Server className="h-8 w-8 text-indigo-600" />}
              title="API Monitoring"
              description="Monitor API endpoints and track response times"
            />
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-indigo-600" />}
              title="Status Pages"
              description="Create public status pages to keep your users informed"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-600 py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <StatCard number="99.9%" text="Average Uptime" />
            <StatCard number="5000+" text="Websites Monitored" />
            <StatCard number="1M+" text="Alerts Sent" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Start monitoring your website today
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of companies who trust UptimeGuard to keep their websites running smoothly.
          </p>
          <button onClick={handleSignUpClick} className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors">
            Get Started Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Activity className="h-6 w-6 text-indigo-600" />
              <span className="text-lg font-bold text-gray-900">Uptime</span>
            </div>
            <div className="text-gray-600">
              © {new Date().getFullYear()} Uptime. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode,
  title: string,
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

type StatCardProps = {
  number: string,
  text: string
}
function StatCard({ number, text } : StatCardProps) {
  return (
    <div className="text-white">
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-indigo-100">{text}</div>
    </div>
  );
}
