
import React from 'react';
import { Button } from '@/components/ui/button';
import NavBar from './NavBar';
import FeatureCard from './FeatureCard';
import PricingSection from './PricingSection';
import IntegrationSection from './IntegrationSection';
import CallToAction from './CallToAction';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { Languages, MessageCircle, Globe } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Languages size={24} />,
      title: 'Real-Time Translation',
      description: 'Translate text across 50+ languages including regional dialects and workplace jargon.',
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'Cultural Nuance Detection',
      description: 'Identify phrases that may be misinterpreted based on cultural context.',
    },
    {
      icon: <Globe size={24} />,
      title: 'Tone Optimization',
      description: 'Adjust tone to match intent and cultural expectations (formal, friendly, neutral).',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6 bg-gradient-to-br from-white to-converse-light">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Effortless <span className="gradient-text">Cross-Cultural</span> Communication
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                ConverseEasy uses advanced NLP to bridge language barriers and cultural gaps in workplace communication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/workspace">
                  <Button className="text-lg px-8 py-6 bg-gradient-to-r from-converse-primary to-converse-secondary hover:opacity-90 transition-opacity">
                    Try Demo
                  </Button>
                </Link>
                <Button variant="outline" className="text-lg px-8 py-6">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 p-4">
              <div className="rounded-xl overflow-hidden shadow-2xl card-shadow bg-white p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="mb-4 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 mb-4">
                  <p className="text-gray-800 mb-2">"Let's wrap this up by EOD."</p>
                  <div className="bg-converse-light p-3 rounded-lg border-l-4 border-converse-primary mt-2">
                    <p className="text-sm text-converse-primary font-medium">ConverseEasy suggests:</p>
                    <p className="text-gray-800">"Could we aim to finalize this by the end of the day?"</p>
                    <p className="text-xs text-gray-500 mt-1">More clear and polite for international teams</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-xs">Translate</Button>
                    <Button size="sm" variant="outline" className="text-xs">Adjust Tone</Button>
                  </div>
                  <Button size="sm" className="text-xs bg-converse-primary hover:bg-converse-secondary">Send</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Key Features</h2>
          <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Our AI-powered tools enhance every conversation across language and cultural barriers
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/workspace">
              <Button className="bg-converse-primary hover:bg-converse-secondary text-white px-8 py-2">
                Try It Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Integration Section */}
      <IntegrationSection />
      
      {/* Pricing Section */}
      <PricingSection />
      
      {/* Call to Action */}
      <CallToAction />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
