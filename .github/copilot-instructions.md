# Credit Key JavaScript SDK

**ALWAYS reference these instructions first and fallback to search or additional context gathering only when you encounter unexpected information that conflicts with the information documented here.**

Credit Key JavaScript SDK is a client-side JavaScript library for integrating Credit Key's payment solution into web applications. The SDK provides modal and redirect payment flows, customer eligibility checks, and marketing display components.

## Working Effectively

### Environment Requirements
- **Node.js Version**: MUST use Node.js 14.19.0 for full functionality
- **Current Runtime Issue**: Node.js 20+ causes compatibility issues with legacy dependencies (node-sass)
- **Python Requirements**: Python 2.x required for node-sass compilation (not available on Ubuntu 24.04+)

### Bootstrap, Build, and Test the Repository

**PREFERRED METHOD - Docker Build (Recommended)**:
```bash
# Build using Docker (uses Node 14.19 Alpine)
docker build -t creditkey-js:latest .
# Extract build artifacts
id=$(docker create creditkey-js:latest)
docker cp $id:/creditkey/creditkey-js/es .
docker cp $id:/creditkey/creditkey-js/lib .
docker cp $id:/creditkey/creditkey-js/umd .
docker rm $id
```
**Time Expectation**: 10-15 minutes for complete Docker build. NEVER CANCEL - Docker build includes yarn install and full compilation.
**NOTE**: Docker build may fail due to Alpine Linux package manager network timeouts. This is an infrastructure issue, not a code issue.

**FALLBACK METHOD - Manual Setup (Limited Functionality)**:
```bash
# Install yarn globally
npm install -g yarn

# NOTE: Full npm/yarn install will FAIL due to node-sass compatibility
# The following provides partial functionality only:

# Install with legacy OpenSSL provider (partial functionality)
NODE_OPTIONS="--openssl-legacy-provider" yarn install
# EXPECTED: This WILL FAIL at node-sass compilation - this is normal

# Partial build (ES5 and ES modules only, UMD will fail)
NODE_OPTIONS="--openssl-legacy-provider" npm run build
# Time: ~5 seconds. UMD build will fail due to node-sass - this is expected
```

### Testing
```bash
# Tests require proper naming pattern and legacy OpenSSL
# NOTE: Tests will FAIL due to sass compilation issues in Node 20+

# To discover tests (they exist but compilation fails):
NODE_OPTIONS="--openssl-legacy-provider" npm test
# Time: ~2 seconds for discovery, fails on sass compilation

# Test files must follow *.test.js pattern (not *-test.js)
# Tests are located in tests/lib/ directory
```

### Key NPM Scripts
- `npm run build` - Build ES5, ES modules, and UMD bundles (UMD fails in Node 20+)
- `npm run clean` - Clean built resources  
- `npm test` - Run test suite via Karma + Chrome Headless
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:watch` - Run tests in watch mode

## Build System Details
- **Build Tool**: nwb (Node.js Web Builder) v0.25.2
- **Module Formats**: ES5 (lib/), ES modules (es/), UMD (umd/)
- **Styling**: SASS compiled via deprecated node-sass
- **Testing**: Karma + Mocha + Chrome Headless
- **Legacy Dependencies**: Uses deprecated packages requiring Python 2 and Node 14.x

## Critical Compatibility Issues
**DO NOT** attempt to upgrade Node.js version or replace node-sass without extensive testing - this will break the build system.

**node-sass Limitation**: 
```
Error: Node Sass does not yet support your current environment: Linux 64-bit with Unsupported runtime (115)
```
This error is expected in Node 20+ and cannot be easily resolved without major dependency updates.

## Validation

### Manual Validation Scenarios
Since the SDK is a client-side library, validation requires testing the built artifacts:

**After making changes, ALWAYS test the built library by**:
1. Build the library (preferably via Docker, or partial build with NODE_OPTIONS)
2. Test the ES module build in a browser environment:
   ```html
   <script type="module">
     import ck from './es/index.js';
     const client = new ck.Client('test-key', 'development');
     console.log('✓ ES Module loaded successfully');
   </script>
   ```
3. Test the UMD build in a browser:
   ```html
   <script src="./umd/creditkey-js.js"></script>
   <script>
     const client = new ck.Client('test-key', 'development');
     console.log('✓ UMD global ck object loaded');
   </script>
   ```
4. **NOTE**: CommonJS build (lib/) will fail in Node.js due to SASS import issues
5. Test key functionality in browser:
   - `ck.checkout(url)` - Modal display
   - `ck.apply(key)` - Apply now flow  
   - Client API methods for eligibility checks

**CRITICAL**: The existing build artifacts (es/, lib/, umd/) are functional. DO NOT delete these unless you can successfully rebuild them.

**Validation Limitation**: Built CommonJS modules cannot be tested directly in Node.js due to SASS compilation issues.

## Common Tasks

### Working with Tests
- Tests are in `tests/lib/` directory
- Must use `.test.js` suffix for discovery (not `-test.js`)
- Symbolic link `test -> tests` exists for pattern matching
- Tests import from `../../src/` paths

### Working with Styles
- SASS files in `src/styles/`
- Main stylesheet: `src/styles/index.sass`
- Uses Bulma CSS framework
- SASS compilation WILL FAIL in Node 20+ environments

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

## Timing Expectations and "NEVER CANCEL" Commands

**NEVER CANCEL these long-running operations**:
- **Docker build**: 10-15 minutes - Downloads Node 14.19 Alpine image and compiles everything
- **yarn install** (in Docker): 3-5 minutes - Downloads and compiles all dependencies
- **Full build** (in Docker): 2-3 minutes - Compiles all module formats

**Quick operations**:
- **Partial build** (ES5 + ES modules): ~5 seconds
- **Test discovery**: ~2 seconds  
- **Clean**: <1 second

## Known Working Commands Summary
```bash
# Recommended approach
docker build -t creditkey-js:latest .  # 10-15 min, NEVER CANCEL

# Fallback (limited functionality)
NODE_OPTIONS="--openssl-legacy-provider" npm run build  # ~5 sec, UMD fails
NODE_OPTIONS="--openssl-legacy-provider" npm test       # ~2 sec, compilation fails
```

## Summary of Current Limitations and Workarounds

**Working in Node 20+ Environment**:
- **Partial Build**: ES5 and ES modules build successfully (~3 seconds)
- **UMD Build**: Fails due to node-sass incompatibility
- **Testing**: Test discovery works but compilation fails
- **Required Workaround**: Always use `NODE_OPTIONS="--openssl-legacy-provider"`

**Recommended Development Approach**:
1. Use Docker for complete builds when possible
2. Use partial builds for development (ES5 + ES modules sufficient for most work)
3. Test functionality using existing UMD build artifacts
4. Validate changes in browser environment, not Node.js

**ALWAYS** use Docker for production builds and complete functionality testing.