
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Lock, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useUserPlans } from '@/utils/userPlans';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const UpgradePro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { upgradeToProPlan } = useUserPlans();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would integrate with Stripe or another payment processor
      const result = await upgradeToProPlan();
      
      if (result.success) {
        toast({
          title: "Upgrade successful!",
          description: "You now have access to all Pro features",
          variant: "default",
        });
        
        // Redirect to workspace after successful upgrade
        setTimeout(() => navigate('/workspace'), 1500);
      } else {
        toast({
          title: "Upgrade failed",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your upgrade. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const proFeatures = [
    "Unlimited message analysis",
    "Priority support",
    "All language pairs",
    "Advanced cultural insights",
    "Slack and Teams integrations",
    "Custom terminology management"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-grow pt-24 pb-10 px-4 md:px-6 container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Upgrade to Pro</h1>
          
          <Card className="mb-8 overflow-hidden">
            <CardHeader className="bg-converse-primary text-white py-6">
              <h2 className="text-2xl font-bold text-center">Pro Plan</h2>
              <p className="text-center opacity-90 mt-2">Unlock the full potential of ConverseEasy</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6 text-center">
                <span className="text-4xl font-bold">$10</span>
                <span className="text-gray-500">/month per user</span>
              </div>
              
              <div className="space-y-4 mb-8">
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-3 text-green-500">
                      <Check size={20} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full py-6 text-lg bg-converse-primary hover:bg-converse-secondary"
                onClick={handleUpgrade}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Upgrade Now'}
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Billed monthly. Cancel anytime.
              </p>
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button 
              variant="link" 
              onClick={() => navigate(-1)}
              className="text-gray-500"
            >
              Return to Previous Page
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UpgradePro;
