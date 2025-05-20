
import React from 'react';
import { BarChart3, Building, Landmark, Home, Car, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AssetCardProps {
  type: 'investment' | 'property' | 'vehicle' | 'company' | 'cash';
  name: string;
  value: number;
  change?: number;
  details?: string;
}

const AssetCard: React.FC<AssetCardProps> = ({ type, name, value, change, details }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getIcon = () => {
    switch (type) {
      case 'investment':
        return <BarChart3 className="h-5 w-5 text-blue-500" />;
      case 'property':
        return <Home className="h-5 w-5 text-green-500" />;
      case 'vehicle':
        return <Car className="h-5 w-5 text-purple-500" />;
      case 'company':
        return <Building className="h-5 w-5 text-orange-500" />;
      case 'cash':
        return <Landmark className="h-5 w-5 text-gray-500" />;
      default:
        return <BarChart3 className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gray-100">{getIcon()}</div>
              <h3 className="font-medium">{name}</h3>
            </div>
            {change !== undefined && (
              <div className={`flex items-center text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(change)}%
              </div>
            )}
          </div>
          <div className="mt-1">
            <div className="text-xl font-bold">{formatCurrency(value)}</div>
            {details && <div className="text-xs text-gray-500 mt-1">{details}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;
