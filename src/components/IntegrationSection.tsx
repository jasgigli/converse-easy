
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const IntegrationSection = () => {
  const integrations = [
    { name: 'Slack', logo: '🔵' },
    { name: 'Microsoft Teams', logo: '🟣' },
    { name: 'Gmail', logo: '🔴' },
    { name: 'Zoom', logo: '🟡' },
    { name: 'Google Meet', logo: '🟢' },
  ];

  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Seamless Integrations</h2>
        <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          ConverseEasy works where you work, integrating with your favorite tools
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {integrations.map((integration, index) => (
            <Card 
              key={index} 
              className="border border-gray-200 hover:border-converse-primary transition-colors light-card-shadow hover:card-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="text-4xl mb-2">{integration.logo}</div>
                <h3 className="text-lg font-medium">{integration.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 p-8 rounded-xl bg-converse-light border border-converse-primary/20 animate-fade-in">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-converse-primary text-white flex items-center justify-center mx-auto mb-4">1</div>
              <h4 className="font-medium mb-2">Install ConverseEasy</h4>
              <p className="text-gray-700">Add our browser extension or app to your workspace</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-converse-primary text-white flex items-center justify-center mx-auto mb-4">2</div>
              <h4 className="font-medium mb-2">Connect Your Tools</h4>
              <p className="text-gray-700">Authorize access to your communication platforms</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-converse-primary text-white flex items-center justify-center mx-auto mb-4">3</div>
              <h4 className="font-medium mb-2">Start Communicating</h4>
              <p className="text-gray-700">Get real-time cultural and language assistance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
