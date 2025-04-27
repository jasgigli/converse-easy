
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <Card 
      className="light-card-shadow hover:card-shadow transition-all duration-300 hover:translate-y-[-5px] animate-fade-in" 
      style={{ animationDelay: `${delay}s` }}
    >
      <CardContent className="p-6">
        <div className="h-12 w-12 rounded-lg bg-converse-light flex items-center justify-center text-converse-primary mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
