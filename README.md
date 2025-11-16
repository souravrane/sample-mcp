# First MCP Server

A Model Context Protocol (MCP) server implementation demonstrating tools, resources, and prompts. This server provides example functionality including mathematical operations, GitHub API integration, file-based resources, and SQL query explanations.

## Features

This MCP server includes:

- **Tools**: Two executable tools for performing operations
- **Resources**: File-based resource access
- **Prompts**: Template prompts for generating content

## Tools

### 1. `add-numbers`
Adds two numbers together.

**Parameters:**
- `a` (number): The first number
- `b` (number): The second number

**Example:**
```json
{
  "a": 5,
  "b": 3
}
```

**Returns:** The sum of the two numbers.

### 2. `get-github-repos`
Fetches a GitHub user's repositories and their descriptions.

**Parameters:**
- `username` (string): The GitHub username

**Example:**
```json
{
  "username": "octocat"
}
```

**Returns:** A list of repositories with their names and descriptions.

## Resources

### `apartment-rules`
A resource providing apartment living rules from a local file (`src/data/rules.doc`).

**URI:** `mcp://apartment-rules/data/rules.doc`

**Description:** The rules for living in any apartment, including guidelines for noise, cleanliness, guests, and general conduct.

## Prompts

### `explain-sql`
Generates a prompt template for explaining SQL queries in simple terms.

**Arguments:**
- `sql` (string): The SQL query to explain

**Example:**
```json
{
  "sql": "SELECT * FROM users WHERE age > 18"
}
```

**Returns:** A user message prompting an explanation of the SQL query in a way that's easy to understand.

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd first-mcp
```

2. Install dependencies:
```bash
npm install
```

## Building

Compile TypeScript to JavaScript:
```bash
npm run build
```

The compiled output will be in the `build/` directory.

## Usage

This MCP server is designed to be used with MCP-compatible clients (such as Claude Desktop, Cursor, or other MCP clients).

### Running the Server

After building, the server can be run via stdio transport. Configure your MCP client to use:

```json
{
  "mcpServers": {
    "first-mcp": {
      "command": "node",
      "args": ["build/index.js"]
    }
  }
}
```

## Project Structure

```
first-mcp/
├── src/
│   ├── data/
│   │   └── rules.doc          # Apartment rules data file
│   └── index.ts               # Main server implementation
├── build/                     # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- **@modelcontextprotocol/sdk**: MCP SDK for building the server
- **zod**: Schema validation for tool and prompt parameters
- **TypeScript**: Type-safe JavaScript development

## Development

The project uses TypeScript with strict type checking. Source files are in `src/`, and compiled output goes to `build/`.

### TypeScript Configuration

- Target: ES2022
- Module: Node16
- Strict mode enabled
- Output directory: `./build`
- Source directory: `./src`

## License

ISC

## Version

1.0.0

