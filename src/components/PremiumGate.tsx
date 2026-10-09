import React from 'react';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { isPremium } from '@/lib/premium';

const PremiumGate: React.FC<{ feature: string; children: React.ReactNode }> = ({ feature, children }) => {
  if (isPremium()) return <>{children}</>;
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 flex items-center justify-center">
        <Card className="max-w-md w-full border-primary border-2">
          <CardContent className="p-8 text-center space-y-4">
            <Crown className="h-10 w-10 text-primary mx-auto" />
            <h1 className="text-xl font-bold font-poppins text-foreground">{feature} is a Premium feature</h1>
            <p className="text-sm text-muted-foreground">Upgrade to Spark Premium for ₦2,000/month to unlock it.</p>
            <Button asChild className="w-full"><Link to="/dashboard/premium">Go Premium</Link></Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PremiumGate;
