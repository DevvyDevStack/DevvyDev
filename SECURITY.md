# DevvyDev Security Policy

## Supported Versions

This project is a static website portfolio. We provide security updates for the following:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | ✅ Yes             |

## Reporting a Vulnerability

If you discover a security vulnerability in DevvyDev, please follow these steps:

### 1. Do Not Open a Public Issue

Please do not report security vulnerabilities through public GitHub issues.

### 2. Email Security Report

Send details of the vulnerability to:
**Email**: devvydevstack@gmail.com

Include the following information:
- Type of issue (e.g., XSS, code injection, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### 3. Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: Varies based on complexity

## Security Considerations

This is a static portfolio website with the following security considerations:

### Content Security Policy (CSP)
Consider implementing CSP headers on your hosting platform:
```
Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; script-src 'self'; img-src 'self' data:;
```

### HTTPS
Always serve the website over HTTPS to ensure:
- Data integrity
- User privacy
- Search engine optimization

### Third-Party Dependencies
The website uses minimal third-party resources:
- Google Fonts (fonts.googleapis.com, fonts.gstatic.com)

### Form Security
The contact form includes:
- Client-side validation
- XSS prevention through proper encoding
- No direct server interaction (implementation dependent)

## Security Best Practices

When hosting this website:

1. **Use HTTPS**: Always serve over secure connections
2. **Update Hosting Platform**: Keep your hosting platform updated
3. **Monitor Access Logs**: Watch for unusual activity
4. **Backup Regularly**: Maintain current backups
5. **Implement CSP**: Use Content Security Policy headers
6. **Form Handling**: Implement proper server-side validation if using forms

## Deployment Security

### GitHub Pages
If using GitHub Pages:
- Repository should be public for GitHub Pages
- Ensure no sensitive data in commit history
- Use environment variables for any configuration

### Custom Hosting
If using custom hosting:
- Keep server software updated
- Use proper file permissions
- Implement rate limiting
- Monitor server logs

## Code Security

The codebase follows security best practices:

### JavaScript
- No `eval()` usage
- Proper event handling
- XSS prevention in dynamic content
- Input validation and sanitization

### CSS
- No external CSS imports from untrusted sources
- Inline styles avoided where possible

### HTML
- Proper attribute encoding
- No inline JavaScript
- Semantic markup for accessibility

## Privacy

This website respects user privacy:
- No tracking cookies
- No analytics without consent
- Minimal data collection
- Clear privacy policy (if implemented)

## Contact

For security-related questions or concerns:
- **Email**: devvydevstack@gmail.com
- **GitHub**: Create a private security advisory

We appreciate your help in keeping DevvyDev secure!
