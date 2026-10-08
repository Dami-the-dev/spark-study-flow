import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, ShieldCheck, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

// Flutterwave PUBLIC key (safe to keep in the app). Replace with your live public key.
const FLW_PUBLIC_KEY = '';
const PRICE_NGN = 2000;

const features = [
  'Unlimited CBT Exam Hall mocks with full result history',
  'Unlimited AI Study Buddy explanations',
  'Unlimited PDF uploads turned into practice questions',
  'All JAMB & WAEC past questions with explanations',
  'Downloadable 2025 syllabus for every subject',
  'Priority email support',
];

const loadFlutterwave = () =>
  new Promise<void>((resolve, reject) => {
    if ((window as any).FlutterwaveCheckout) return resolve();
    const s = document.createElement('script');
    s.src = 'https://checkout.flutterwave.com/v3.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Could not load payment window'));
    document.body.appendChild(s);
  });

const Premium: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FLW_PUBLIC_KEY) {
      toast.info('Payments are coming soon. Please check back shortly!');
      return;
    }
    setLoading(true);
    try {
      await loadFlutterwave();
      (window as any).FlutterwaveCheckout({
        public_key: FLW_PUBLIC_KEY,
        tx_ref: `spark-${Date.now()}`,
        amount: PRICE_NGN,
        currency: 'NGN',
        payment_options: 'card, banktransfer, ussd',
        customer: { email, name, phone_number: phone },
        customizations: {
          title: 'Spark Study Premium',
          description: 'Monthly subscription',
          logo: `${window.location.origin}/icon-192.png`,
        },
        callback: (res: any) => {
          if (res?.status === 'successful' || res?.status === 'completed') {
            localStorage.setItem('sparkstudy_premium', JSON.stringify({ email, tx: res.transaction_id, at: Date.now() }));
            toast.success('Payment received! Welcome to Spark Premium.');
          } else {
            toast.error('Payment was not completed.');
          }
        },
        onclose: () => setLoading(false),
      });
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
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
                <Badge className="w-fit">Monthly</Badge>
                <CardTitle className="text-4xl font-poppins text-foreground pt-2">
                  ₦{PRICE_NGN.toLocaleString()}<span className="text-base font-normal text-muted-foreground"> / month</span>
                </CardTitle>
                <CardDescription>Cancel anytime. Pay with card, bank transfer or USSD.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-6" asChild>
                  <Link to="/dashboard/cbt-exam"><Eye className="h-4 w-4 mr-2" /> View demo</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Subscribe</CardTitle>
                <CardDescription>Enter your details to continue to secure payment.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={pay} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={20} />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Opening payment…' : `Pay ₦${PRICE_NGN.toLocaleString()}`}
                  </Button>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" /> Payments are processed securely by Flutterwave.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Premium;
