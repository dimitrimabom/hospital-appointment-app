'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'Navigate to the Appointments page and fill in the booking form with your preferred doctor, date, and time. Submit the form to confirm your appointment.',
    },
    {
      question: 'Can I reschedule my appointment?',
      answer: 'Yes, you can reschedule scheduled appointments from your appointments list. Click on the appointment and select the reschedule option.',
    },
    {
      question: 'How do I cancel an appointment?',
      answer: 'You can cancel scheduled appointments from your appointments list. Note that cancellations should be made at least 24 hours before the appointment.',
    },
    {
      question: 'What if I forget my password?',
      answer: 'Click the "Forgot Password" link on the login page. Enter your email address and follow the password reset instructions sent to your inbox.',
    },
    {
      question: 'Is my medical information secure?',
      answer: 'Yes, all your medical information is encrypted and stored securely. We comply with all relevant healthcare data protection regulations.',
    },
    {
      question: 'How do I update my profile?',
      answer: 'Go to Profile Settings in your account menu to update your personal information, contact details, and preferences.',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions</p>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <Card className="border-0 shadow-sm bg-primary/5">
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>Get in touch with our support team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="font-medium text-foreground mb-1">📧 Email</p>
              <p className="text-sm text-muted-foreground">support@medicare.com</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">📞 Phone</p>
              <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">💬 Chat</p>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  );
}
