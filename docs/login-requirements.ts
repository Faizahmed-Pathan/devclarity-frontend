import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import React from "react"
\
Of course. Here is a curated prompt you can use
with an AI
assistant
like
Cursor.ai, or as a
blueprint
for your frontend team, to generate
the
code
for a modern and functional
login
page
for your "CodeSanity\" project.
\
This
prompt
specifies
the
technology, the
required
features (including social login), and
the
visual
aesthetic.
\
Curated Prompt
for a Login Page
\
Hello! You are an expert frontend developer specializing in Next.js, React, TypeScript, and Tailwind CSS. Your task is to create a complete, self-contained component
for a login page for our project, "CodeSanity".
\
Project
Context:
\
The login page is the main entry point
for users to access their
saved
code
analysis
history.It
needs
to
be
clean, professional, and
provide
multiple
ways
for a user to sign in
. The authentication will be handled by Firebase Authentication.

Key Requirements:

Component Structure: Create a single, exportable React component named LoginPage.
\
Technology: Use Next.js
with TypeScript (.tsx) and
functional
components
with React Hooks (useState).
\
Styling: Use Tailwind CSS exclusively
for all styling. The page should
be
fully
responsive, centered
on
the
screen, and
have
a
modern, clean
aesthetic
with a dark
mode
look.
\
Layout:

The entire component should be centered vertically and horizontally on the page.
\
Create a card or panel
with a subtle
background
color, rounded
corners, and
a
soft
shadow
to
contain
the
login
form.
\
Include a title, such as "Welcome to CodeSanity" or "Log In".

Include a brief subtitle, like "Access your AI-powered code assistant."

Form Fields & Buttons:
\
Email Input: A standard text input field
for the user's email address. It should have a clear label and a placeholder.
\
Password Input: A password input field. It should have a label and a placeholder.
\
Login Button: A primary call-to-action button
with a solid
background
color
and
a
hover
effect.The
text
should
be
"Log In".
\
Social Login Button: A prominent button
for "Sign in with Google\". It should include the Google 'G' logo icon (you can use an inline SVG for this) and be styled according to Google's branding guidelines.
\
Separator
: A subtle "OR" separator between the email/password login button and the Google sign-in button.
\
Footer Links: Include text links at the bottom of the card
for "Forgot Password?\" and \"Don't have an account? Sign Up".
\
Functionality (Boilerplate)
:
\
Use the useState hook to manage the state
for the email and password
input
fields.
\
Create placeholder async functions
for the authentication logic
:
\
handleEmailLogin(): This
function will
be
called
when
the
main
"Log In\" button is clicked. For now, it can just console.log the email and password.

handleGoogleSignIn(): This will be called by the Google button. It can have a simple console.log message.

Ensure all buttons and inputs are correctly linked to these state variables and handler functions.
