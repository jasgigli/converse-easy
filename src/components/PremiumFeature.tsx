import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PremiumFeatureProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  disabled?: boolean;
}

const PremiumFeature: React.FC<PremiumFeatureProps> = ({
  title,
  description,
  features,
  icon,
  disabled = false
}) => {
  return (
    <Card className={`relative overflow-hidden ${disabled ? 'opacity-60' : ''}`}>
      <div className="absolute top-0 right-0 bg-gradient-to-bl from-converse-primary to-converse-secondary p-2 rounded-bl-lg">
        <Badge variant="secondary" className="bg-white text-converse-primary">
          <Sparkles size={12} className="mr-1" />
          Pro
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="text-converse-primary">
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            
            <ul className="space-y-2 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-converse-primary rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
            
            <Link to="/upgrade/pro">
              <Button 
                className="w-full bg-converse-primary hover:bg-converse-secondary"
                disabled={disabled}
              >
                <Lock size={16} className="mr-2" />
                Upgrade to Access
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumFeature;