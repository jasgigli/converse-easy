
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-r from-converse-primary to-converse-secondary text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Team Communication?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of global teams using ConverseEasy to break down language barriers and cultural gaps
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/workspace">
            <Button size="lg" className="bg-white text-converse-primary hover:bg-gray-100 px-8">
              Try Demo
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 px-8">
            Contact Sales
          </Button>
        </div>
        <p className="mt-6 text-sm opacity-80">No credit card required for trial. Cancel anytime.</p>
      </div>
    </section>
  );
};

export default CallToAction;
