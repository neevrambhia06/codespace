import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

interface ProjectCreatedEmailProps {
  userName: string;
  projectName: string;
  projectUrl: string;
}

export const ProjectCreatedEmail = ({
  userName = "Developer",
  projectName = "New Project",
  projectUrl = "https://codespace.dev",
}: ProjectCreatedEmailProps) => (
  <Html>
    <Head />
    <Preview>Your new project &quot;{projectName}&quot; is ready on CodeSpace.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Project Created Successfully</Heading>
        <Text style={text}>Hi {userName},</Text>
        <Text style={text}>
          Your new project <strong>{projectName}</strong> has been successfully initialized in your CodeSpace workspace.
        </Text>
        <Button style={button} href={projectUrl}>
          View Project
        </Button>
        <Text style={footer}>
          If you didn&apos;t create this project, please secure your account immediately.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  padding: "17px 0 0",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 20px",
};

const button = {
  backgroundColor: "#000",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "200px",
  padding: "12px",
  margin: "20px auto",
};

const footer = {
  color: "#898989",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
  padding: "0 20px",
};

export default ProjectCreatedEmail;
