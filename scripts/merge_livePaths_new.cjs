const fs = require('fs');

const livePaths = require('../temp_livePaths.json');
const partnerPaths = require('../temp_partnerPaths.json');
const extraPaths = require('../temp_extraPaths.json');

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
  fit_call: ${JSON.stringify(extraPaths.fit_call, null, 2)},
  sales_demo: ${JSON.stringify(extraPaths.sales_demo, null, 2)},
  partner_gatekeeper: ${JSON.stringify(partnerPaths.partner_gatekeeper, null, 2)},
  partner_live: ${JSON.stringify(partnerPaths.partner_live, null, 2)}
};
`;

fs.writeFileSync('../src/data/livePaths.ts', newContent);
console.log('Successfully wrote src/data/livePaths.ts');
