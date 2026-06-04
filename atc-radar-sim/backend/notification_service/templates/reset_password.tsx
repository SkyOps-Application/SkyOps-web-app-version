
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './layout';

interface ResetPasswordEmailProps {
    first_name: string;
}

const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3001'; // Frontend URL

export const ResetPasswordEmail = ({
    first_name,
}: ResetPasswordEmailProps) => {
    return (
        <EmailLayout preview="Reset your SkyOps Password">
            <Section style={content}>
                <Text style={paragraph}>Hi {first_name},</Text>
                <Text style={paragraph}>
                    We received a request to reset your password for your SkyOps account.
                    If you didn't ask for this, you can safely ignore this email.
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href={`${baseUrl}/reset-password`}>
                        Reset your password
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Click the button above to go to the reset page.
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    Best regards,<br />
                    The SkyOps Team
                </Text>
            </Section>
        </EmailLayout>
    );
};

export default ResetPasswordEmail;

const content = {
    padding: '0 48px',
};

const paragraph = {

    fontSize: '16px',
    lineHeight: '26px',
    color: '#555',
};

const btnContainer = {
    textAlign: 'center' as const,
    marginTop: '32px',
    marginBottom: '32px',
};

const button = {
    backgroundColor: '#0C2D57',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingLeft: '24px',
    paddingRight: '24px',
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
};
