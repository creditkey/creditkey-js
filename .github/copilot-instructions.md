# Credit Key JavaScript SDK

**ALWAYS reference these instructions first and fallback to search or additional context gathering only when you encounter unexpected information that conflicts with the information documented here.**

Credit Key JavaScript SDK is a client-side JavaScript library for integrating Credit Key's payment solution into web applications. The SDK provides modal and redirect payment flows, customer eligibility checks, and marketing display components.

## Working Effectively

### Environment Requirements
- **Node.js Version**: Requires Node.js >=18.0.0 (as specified in package.json engines)
- **Legacy OpenSSL Provider**: Required for webpack compatibility with Node 18+
- **No Python Dependencies**: SASS dependencies have been removed - no Python 2.x requirement

### Bootstrap, Build, and Test the Repository

**PREFERRED METHOD - Direct npm install and build**:
```bash
# Install dependencies
npm install
# Time: ~1 minute with some deprecation warnings (expected)

# Build all module formats (ES5, ES modules, and UMD)
npm run build
# Time: ~5-10 seconds for complete build including UMD

# Run tests
npm test  
# Time: ~10 seconds, runs 27+ tests successfully
```

**ALTERNATIVE METHOD - Docker Build (if needed)**:
```bash
# Build using Docker (still available but not required)
docker build -t creditkey-js:latest .
# Extract build artifacts if needed
id=$(docker create creditkey-js:latest)
docker cp $id:/creditkey/creditkey-js/es .
docker cp $id:/creditkey/creditkey-js/lib .
docker cp $id:/creditkey/creditkey-js/umd .
docker rm $id
```
**Time Expectation**: 10-15 minutes for complete Docker build. Only use if direct npm approach fails.

### Testing
```bash
# Tests work directly with npm
npm test
# Time: ~10 seconds, runs 27+ tests with coverage report

# Test coverage
npm run test:coverage
# Generates detailed coverage report

# Watch mode for development
npm run test:watch
# Runs tests in watch mode for development

# Test files follow *.test.js pattern (not *-test.js)
# Tests are located in tests/lib/ directory
```

### Key NPM Scripts
- `npm run build` - Build ES5, ES modules, and UMD bundles (all formats work successfully)
- `npm run clean` - Clean built resources  
- `npm test` - Run test suite via Karma + Chrome Headless (27+ tests)
- `npm run test:coverage` - Run tests with coverage report 
- `npm run test:watch` - Run tests in watch mode

## Build System Details
- **Build Tool**: nwb (Node.js Web Builder) v0.25.2
- **Module Formats**: ES5 (lib/), ES modules (es/), UMD (umd/)
- **Styling**: CSS-only (SASS dependencies removed)
- **Testing**: Karma + Mocha + Chrome Headless
- **Modern Compatibility**: Works with Node 18+ using legacy OpenSSL provider

## Current Status - Fully Functional
**All build processes work successfully** - the repository has been modernized:

- ✅ **Full npm install** works without issues
- ✅ **Complete builds** generate all module formats (ES5, ES modules, UMD)
- ✅ **Tests run successfully** with full test suite passing
- ✅ **No SASS compilation issues** - styling moved to pure CSS
- ✅ **No Python dependencies** - node-sass removed entirely

## Validation

### Manual Validation Scenarios
Since the SDK is a client-side library, validation requires testing the built artifacts:

**After making changes, ALWAYS test the built library by**:
1. Build the library using npm: `npm run build`
2. Run the test suite: `npm test` (27+ tests should pass)
3. Test the ES module build in a browser environment:
   ```html
   <script type="module">
     import ck from './es/index.js';
     const client = new ck.Client('test-key', 'development');
     console.log('✓ ES Module loaded successfully');
   </script>
   ```
4. Test the UMD build in a browser:
   ```html
   <script src="./umd/creditkey-js.js"></script>
   <script>
     const client = new ck.Client('test-key', 'development');
     console.log('✓ UMD global ck object loaded');
   </script>
   ```
5. Test the CommonJS build in Node.js:
   ```javascript
   const ck = require('./lib/index.js');
   const client = new ck.Client('test-key', 'development');
   console.log('✓ CommonJS module loaded successfully');
   ```
6. Test key functionality in browser:
   - `ck.checkout(url)` - Modal display
   - `ck.apply(key)` - Apply now flow  
   - Client API methods for eligibility checks

**All module formats are fully functional** and can be rebuilt reliably using `npm run build`.

## Common Tasks

### Working with Tests
- Tests are in `tests/lib/` directory
- Must use `.test.js` suffix for discovery (not `-test.js`)
- Symbolic link `test -> tests` exists for pattern matching
- Tests import from `../../src/` paths

### Working with Styles
- CSS files in `src/styles/`
- Main stylesheet: `src/styles/index.css`
- Uses Bulma CSS framework 
- Styles are now pure CSS (no SASS compilation needed)

### Directory Structure
```
├── src/                    # Source code
│   ├── lib/               # Core library modules
│   ├── styles/           # SASS stylesheets  
│   └── utils/            # Utility functions
├── tests/lib/            # Test files (*.test.js pattern)
├── es/                   # ES modules build output
├── lib/                  # ES5 build output  
├── umd/                  # UMD build output
├── nwb.config.js         # Build configuration
├── Dockerfile            # Docker build (Node 14.19)
└── build.sh             # Docker build script
```

### Key Files to Monitor
- `package.json` - Dependencies and scripts
- `nwb.config.js` - Build configuration
- `src/index.js` - Main entry point
- `src/lib/client.js` - Core API client
- `src/lib/checkout.js` - Checkout flow implementation

## Timing Expectations

**Standard operations (all work reliably)**:
- **npm install**: ~60 seconds - Downloads all dependencies (with expected deprecation warnings)
- **npm run build**: ~5-10 seconds - Compiles all module formats (ES5, ES modules, UMD)
- **npm test**: ~10 seconds - Runs full test suite with 27+ tests
- **npm run clean**: <1 second - Cleans build artifacts

**Optional Docker operations** (if needed):
- **Docker build**: 10-15 minutes - Complete containerized build
- **Docker dependency install**: 3-5 minutes - Downloads and compiles all dependencies

## Working Commands Summary
```bash
# Primary development workflow (all fully functional)
npm install                    # Install dependencies
npm run build                  # Build all module formats  
npm test                      # Run complete test suite
npm run test:coverage         # Generate coverage report
npm run clean                 # Clean build artifacts

# Docker workflow (alternative)
docker build -t creditkey-js:latest .  # 10-15 min if containerized build needed
```

## Summary of Current Capabilities

**Fully Modern Development Environment**:
- ✅ **Complete npm workflow** - all commands work out of the box
- ✅ **All module formats** - ES5, ES modules, and UMD builds all succeed  
- ✅ **Full testing suite** - 27+ tests run successfully with coverage
- ✅ **No legacy constraints** - no Python, Docker, or Node 14.x requirements
- ✅ **Quick iterations** - build and test cycles complete in seconds

**Recommended Development Approach**:
1. Use `npm install && npm run build && npm test` for complete setup and validation
2. Use `npm run build` for quick rebuilds during development  
3. Use `npm test` for continuous validation
4. All module formats can be tested directly in their target environments
5. Docker is available as alternative but not required for development