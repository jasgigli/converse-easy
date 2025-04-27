
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Freemium',
      price: '$0',
      description: 'Basic features for individual use',
      features: [
        'Basic translation',
        'Tone analysis',
        '50 messages/day limit',
        'Individual use only',
      ],
      buttonText: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$10',
      period: 'per user / month',
      description: 'Full features for professionals',
      features: [
        'Unlimited messages',
        'Slack/Teams integrations',
        'Personalized suggestions',
        'Context-aware recommendations',
        'Mobile app access',
      ],
      buttonText: 'Start 14-Day Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$25',
      period: 'per user / month',
      description: 'Advanced features for teams',
      features: [
        'Everything in Pro',
        'Team analytics',
        'Custom cultural knowledge base',
        'Priority support',
        'API access',
      ],
      buttonText: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Pricing Plans</h2>
        <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          Choose the perfect plan for your communication needs
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`overflow-hidden animate-fade-in ${
                plan.popular ? 'border-converse-primary border-2 relative' : 'border-gray-200'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="bg-converse-primary text-white text-xs font-semibold py-1 px-3 absolute top-0 right-0 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <CardHeader className="pt-8 px-6 pb-0">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 text-sm ml-1">{plan.period}</span>}
                </div>
                <p className="text-gray-500 mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 text-converse-primary mt-1">
                        <Check size={16} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pb-8 px-6">
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-converse-primary hover:bg-converse-secondary' 
                      : 'bg-white text-converse-primary border border-converse-primary hover:bg-converse-light'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
