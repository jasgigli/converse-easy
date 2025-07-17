import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Settings, 
  Zap,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface IntegrationCardProps {
  name: string;
  description: string;
  logo: string;
  color: string;
  features: string[];
  status: 'available' | 'coming-soon' | 'connected';
  delay?: number;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  description,
  logo,
  color,
  features,
  status,
  delay = 0
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(status === 'connected');
  const { toast } = useToast();

  const handleConnect = async () => {
    if (status === 'coming-soon') {
      toast({
        title: "Coming Soon",
        description: `${name} integration is under development. We'll notify you when it's ready!`,
        variant: "default"
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConnected(true);
    setIsConnecting(false);
    
    toast({
      title: "Integration Connected!",
      description: `${name} has been successfully connected to your workspace.`,
      variant: "default"
    });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Integration Disconnected",
      description: `${name} has been disconnected from your workspace.`,
      variant: "destructive"
    });
  };

  const getStatusColor = () => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'coming-soon': return 'bg-yellow-100 text-yellow-800';
      case 'connected': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    if (isConnected) return 'Connected';
    switch (status) {
      case 'available': return 'Available';
      case 'coming-soon': return 'Coming Soon';
      default: return 'Available';
    }
  };

  return (
    <Card 
      className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-2xl ${
              color === 'blue' ? 'bg-blue-100' :
              color === 'purple' ? 'bg-purple-100' :
              color === 'red' ? 'bg-red-100' :
              color === 'yellow' ? 'bg-yellow-100' :
              'bg-green-100'
            }`}>
              {logo}
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
                {getStatusText()}
              </Badge>
            </div>
          </div>
          {status === 'coming-soon' && (
            <Clock size={20} className="text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Zap size={16} />
            Key Features
          </h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                <CheckCircle2 size={12} className="text-green-500 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex gap-2">
          {!isConnected ? (
            <Button 
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex-1"
              variant={status === 'coming-soon' ? 'secondary' : 'default'}
            >
              {isConnecting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Connecting...
                </>
              ) : status === 'coming-soon' ? (
                <>
                  <AlertCircle size={16} className="mr-2" />
                  Notify Me
                </>
              ) : (
                <>
                  <ExternalLink size={16} className="mr-2" />
                  Connect
                </>
              )}
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleDisconnect}
                variant="outline"
                className="flex-1"
              >
                <Settings size={16} className="mr-2" />
                Manage
              </Button>
              <Button 
                onClick={handleDisconnect}
                variant="destructive"
                size="sm"
              >
                Disconnect
              </Button>
            </>
          )}
        </div>
        
        {status === 'coming-soon' && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span className="font-medium">Expected Q2 2024</span>
            </div>
            <p className="mt-1">Join our waitlist to be notified when this integration is ready.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;