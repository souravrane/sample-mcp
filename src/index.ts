import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";


const server = new McpServer({
    name: "first-mcp",
    version: "1.0.0",
    title: "First MCP",
});

const parameters = z.object({
    a: z.number().describe("The first number"),
    b: z.number().describe("The second number"),
});

server.registerTool("add-numbers", {
    description: "Add two numbers together",
    inputSchema: parameters,
}, async ({a, b}) => {
    return {
        content: [
            {
                type: "text",
                text: `The sum of ${a} and ${b} is ${a + b}`,
            },
        ],
    };
});


server.registerTool("get-github-repos", {
    description: "Given a GitHub username, return the user's repositories and their descriptions",
    inputSchema: z.object({
        username: z.string().describe("The GitHub username: "),
    }),
}, async ({ username }) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers:{"User-Agent": "MCP-Server"}
    });

    if (!response.ok) throw new Error(`Failed to fetch GitHub repositories: ${response.statusText}`);
    const data = await response.json() as Array<{ name: string; description: string | null }>;
    return {
        content: [
            {
                type: "text",
                text: `The user's repositories and their descriptions are: ${data.map(repo => `${repo.name}: ${repo.description}`).join("\n")}`,   
            },
        ],
    };
});

server.registerResource("apartment-rules", "mcp://apartment-rules/data/rules.doc", {
    description: "The rules for the living in any apartment",
}, async (uri) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const rules = await fs.readFile(path.resolve(__dirname, "../src/data/rules.doc"), "utf-8");
    return {
        contents: [
            {
                uri: uri.href,
                text: rules,
            },
        ],
    };
});

server.registerPrompt("explain-sql", {
    description: "Explain the SQL query",
    argsSchema: {
        sql: z.string().describe("The SQL query to explain"),
    },
}, async ({ sql }) => {
    return {
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: `Explain the following SQL query: ${sql} in a way that is easy to understand for a 5 year old.`,
                }
            }
        ]
    };
});

async function main() {
    const transport = new StdioServerTransport();
    server.connect(transport);
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})

