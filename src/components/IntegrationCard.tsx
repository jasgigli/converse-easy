import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Check, 
  Settings, 
  ExternalLink, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface IntegrationCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected' | 'pending';
  isPro?: boolean;
  features: string[];
  onConnect?: () => void;
  onDisconnect?: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  description,
  icon,
  status,
  isPro = false,
  features,
  onConnect,
  onDisconnect
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onConnect) {
        onConnect();
      }
      
      toast({
        title: "Integration connected",
        description: `${name} has been successfully connected to your workspace`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    if (onDisconnect) {
      onDisconnect();
    }
    toast({
      title: "Integration disconnected",
      description: `${name} has been disconnected from your workspace`,
      variant: "default"
    });
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="relative overflow-hidden">
      {isPro && (
        <div className="absolute top-0 right-0 bg-gradient-to-bl from-converse-primary to-converse-secondary p-2 rounded-bl-lg">
          <Badge variant="secondary" className="bg-white text-converse-primary text-xs">
            Pro
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-converse-primary">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <Badge variant="outline" className={getStatusColor()}>
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check size={14} className="text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Switch 
                checked={status === 'connected'}
                onCheckedChange={status === 'connected' ? handleDisconnect : handleConnect}
                disabled={isConnecting || isPro}
              />
              <span className="text-sm">
                {status === 'connected' ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            <div className="flex gap-2">
              {status === 'connected' && (
                <Button variant="outline" size="sm">
                  <Settings size={14} className="mr-2" />
                  Settings
                </Button>
              )}
              
              <Button 
                variant={status === 'connected' ? 'outline' : 'default'}
                size="sm"
                onClick={status === 'connected' ? handleDisconnect : handleConnect}
                disabled={isConnecting || isPro}
                className={!isPro && status !== 'connected' ? 'bg-converse-primary hover:bg-converse-secondary' : ''}
              >
                {isConnecting ? (
                  'Connecting...'
                ) : status === 'connected' ? (
                  'Disconnect'
                ) : isPro ? (
                  <>
                    <ExternalLink size={14} className="mr-2" />
                    Upgrade to Pro
                  </>
                ) : (
                  'Connect'
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;