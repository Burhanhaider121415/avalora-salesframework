const fs = require('fs');
const oldTs = fs.readFileSync('temp_existing_livePaths.ts', 'utf8');

const livePaths = require('./temp_livePaths.json');
const partnerPaths = require('./temp_partnerPaths.json');

let fitCallStr = '';
let salesDemoStr = '';

const fitCallMatch = oldTs.match(/(fit_call: \{[\s\S]*?\}),\n\s*sales_demo:/);
if (fitCallMatch) {
  fitCallStr = fitCallMatch[1];
} else {
  console.log("Could not match fit_call");
}

const salesDemoMatch = oldTs.match(/(sales_demo: \{[\s\S]*?\n  \})/);
if (salesDemoMatch) {
  salesDemoStr = salesDemoMatch[1];
} else {
  console.log("Could not match sales_demo");
}

let newContent = `export type ActionTarget = 'next' | 'back' | 'disposition' | string;

export interface BranchButton {
  id: string;
  label: string;
  target: ActionTarget;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface ScriptNode {
  id: string;
  stage: string;
  goal: string;
  sayThis: string;
  doNotSay?: string;
  branchButtons: BranchButton[];
}

export interface LivePath {
  id: string;
  name: string;
  workspace: 'medspa' | 'partner';
  nodes: Record<string, ScriptNode>;
  initialNode: string;
}

export const livePaths: Record<string, LivePath> = {
  medspa_gatekeeper: ${JSON.stringify(livePaths.medspa_gatekeeper, null, 2)},
  medspa_owner: ${JSON.stringify(livePaths.medspa_owner, null, 2)},
`;

if (fitCallStr) {
  newContent += `  ${fitCallStr},\n`;
}
if (salesDemoStr) {
  newContent += `  ${salesDemoStr},\n`;
}

newContent += `  partner_gatekeeper: ${JSON.stringify(partnerPaths.partner_gatekeeper, null, 2)},
  partner_live: ${JSON.stringify(partnerPaths.partner_live, null, 2)}
};
`;

fs.writeFileSync('src/data/livePaths.ts', newContent);
console.log('Successfully wrote src/data/livePaths.ts');
