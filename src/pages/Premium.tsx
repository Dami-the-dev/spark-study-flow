import React, { useEffect, useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, ShieldCheck, Eye, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Link, useSearchParams } from 'react-router-dom';
import { isPremium, activatePremium, FREE_LIMITS, PREMIUM_JAMB_PER_SUBJECT } from '@/lib/premium';

// Your Flutterwave Payment Link (create it in Flutterwave → Payment Links, ₦2,000,
// and set the redirect URL to https://spark-study1.lovable.app/dashboard/premium).
const FLW_PAYMENT_LINK = '';
const PRICE_NGN = 2000;

const premiumFeatures = [
  'Full CBT Exam Hall — real UTME mock with timer, calculator and results',
  'Unlimited AI Study Assistant questions',
  'Unlimited uploads turned into practice questions',
  `${PREMIUM_JAMB_PER_SUBJECT} JAMB questions per subject in every practice session`,
];

const freeFeatures = [
  `${FREE_LIMITS.uploads} uploads`,
  `${FREE_LIMITS.aiQuestions} AI Assistant questions`,
  `Up to ${FREE_LIMITS.jambPerSubject} JAMB questions per subject`,
  'WAEC questions, syllabus and study planner',
];

const Premium: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const [premium, setPremium] = useState(isPremium());

  useEffect(() => {
    const status = params.get('status');
    if (!status) return;
    if (status === 'successful' || status === 'completed') {
      activatePremium(params.get('transaction_id') || params.get('tx_ref') || 'flw');
      setPremium(true);
      toast.success('Payment received! Welcome to Spark Premium.');
    } else {
      toast.error('Payment was not completed.');
    }
    setParams({}, { replace: true });
  }, [params, setParams]);

  const pay = () => {
    if (!FLW_PAYMENT_LINK) {
      toast.info('Payments are coming soon. Please check back shortly!');
      return;
    }
    window.location.href = FLW_PAYMENT_LINK;
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-foreground font-poppins">
              <Crown className="h-6 w-6 text-primary" /> Spark Premium
            </h1>
            <p className="text-sm text-muted-foreground">Everything you need to ace JAMB & WAEC, for less than the cost of one textbook.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-primary border-2">
              <CardHeader>
                <Badge className="w-fit">{premium ? 'Active' : 'Premium'}</Badge>
                <CardTitle className="text-4xl font-poppins text-foreground pt-2">
                  ₦{PRICE_NGN.toLocaleString()}<span className="text-base font-normal text-muted-foreground"> / month</span>
                </CardTitle>
                <CardDescription>Pay with card, bank transfer or USSD.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {premiumFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" onClick={pay} disabled={premium}>
                  {premium ? 'You are Premium' : `Pay ₦${PRICE_NGN.toLocaleString()} with Flutterwave`}
                </Button>
                <p className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Payments are processed securely by Flutterwave.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Free</Badge>
                <CardTitle className="text-4xl font-poppins text-foreground pt-2">₦0</CardTitle>
                <CardDescription>What you get without Premium.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {freeFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4 mt-0.5 shrink-0" /> CBT Exam Hall locked
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6" asChild>
                  <Link to="/dashboard/past-questions"><Eye className="h-4 w-4 mr-2" /> View demo</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Premium;
