import * as React from 'react';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { Button } from '@react-email/button';
import { EmailLayout } from './layout';

interface WelcomeEmailProps {
  first_name?: string;
}

export const WelcomeEmail = ({ first_name = 'Pilot' }: WelcomeEmailProps) => {
  return (
    <EmailLayout preview="Welcome to SkyOps Radar Simulator!">
      <Section style={content}>
        <Text style={paragraph}>Hello {first_name},</Text>
        <Text style={paragraph}>
          Welcome to <strong>SkyOps</strong>! We are excited to have you join our
          community of aviation enthusiasts and ATC controllers.
        </Text>
        <Text style={paragraph}>
          Get ready to manage the skies and ensure safety in our high-fidelity
          radar simulator.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="http://localhost:3000/login">
            Start Simulation
          </Button>
        </Section>
        <Text style={paragraph}>
          Need help? Reply to this email or visit our support center.
        </Text>
      </Section>
    </EmailLayout>
  );
};

const content = {
  padding: '0 48px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#525f7f',
};

const btnContainer = {
  textAlign: 'center' as const,
  marginTop: '32px',
  marginBottom: '32px',
};

const button = {
  backgroundColor: '#0ea5e9',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px 0',
};

export default WelcomeEmail;
