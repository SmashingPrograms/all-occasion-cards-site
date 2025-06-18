# Testing

## Quick Start

### Install Dependencies
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-axe
```

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode (recommended for development)
npm test -- --watch

# Run with coverage report
npm test -- --coverage

# Run specific test suite
npm test -- --testNamePattern="Header Component"
```