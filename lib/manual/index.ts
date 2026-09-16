import { baseGenerationChapters } from './base-generation';
import { finalPipelineChapters } from './final-pipeline';
import { foundationChapters } from './foundation';
import { peoplePplAdditions } from './people-ppl-additions';
import { peoplePplWorkflow01Chapters } from './people-ppl-workflow-01';
import { workflowEngineeringChapters } from './workflow-engineering';
import { workflowEngineeringNodeLiteracyChapters } from './workflow-engineering-node-literacy';
import { workflowEngineeringGraphLiteracyChapters } from './workflow-engineering-graph-literacy';
import { workflowEngineeringGroupsNamingChapters } from './workflow-engineering-groups-naming';
import { workflowEngineeringBaseConfigChapters } from './workflow-engineering-base-config';
import { workflowEngineeringDataControlPlaneChapters } from './workflow-engineering-data-control-plane';
import { workflowEngineeringSwitchesRoutingChapters } from './workflow-engineering-switches-routing';
import { workflowEngineeringExecutionCacheChapters } from './workflow-engineering-execution-cache';
import { workflowEngineeringRoutingLabChapters } from './workflow-engineering-routing-lab';
import { workflowEngineeringBaseConfigLabChapters } from './workflow-engineering-base-config-lab';
import { workflowEngineeringModuleContractLabChapters } from './workflow-engineering-module-contract-lab';
import { workflowEngineeringModuleContractsChapters } from './workflow-engineering-module-contracts';
import { workflowEngineeringCoordinatesBatchChapters } from './workflow-engineering-coordinates-batch';
import { workflowEngineeringDebuggingChapters } from './workflow-engineering-debugging';
import { workflowEngineeringReproducibilityChapters } from './workflow-engineering-reproducibility';

export const additionalChapters = [
  ...workflowEngineeringChapters,
  ...workflowEngineeringNodeLiteracyChapters,
  ...workflowEngineeringGraphLiteracyChapters,
  ...workflowEngineeringGroupsNamingChapters,
  ...workflowEngineeringBaseConfigChapters,
  ...workflowEngineeringDataControlPlaneChapters,
  ...workflowEngineeringSwitchesRoutingChapters,
  ...workflowEngineeringExecutionCacheChapters,
  ...workflowEngineeringRoutingLabChapters,
  ...workflowEngineeringBaseConfigLabChapters,
  ...workflowEngineeringModuleContractLabChapters,
  ...workflowEngineeringModuleContractsChapters,
  ...workflowEngineeringCoordinatesBatchChapters,
  ...workflowEngineeringDebuggingChapters,
  ...workflowEngineeringReproducibilityChapters,
  ...foundationChapters,
  ...baseGenerationChapters,
  ...peoplePplWorkflow01Chapters,
  ...peoplePplAdditions,
  ...finalPipelineChapters,
];

export {
  baseGenerationChapters,
  finalPipelineChapters,
  foundationChapters,
  peoplePplAdditions,
  peoplePplWorkflow01Chapters,
  workflowEngineeringChapters,
  workflowEngineeringNodeLiteracyChapters,
  workflowEngineeringGraphLiteracyChapters,
  workflowEngineeringGroupsNamingChapters,
  workflowEngineeringBaseConfigChapters,
  workflowEngineeringDataControlPlaneChapters,
  workflowEngineeringSwitchesRoutingChapters,
  workflowEngineeringExecutionCacheChapters,
  workflowEngineeringRoutingLabChapters,
  workflowEngineeringBaseConfigLabChapters,
  workflowEngineeringModuleContractLabChapters,
  workflowEngineeringModuleContractsChapters,
  workflowEngineeringCoordinatesBatchChapters,
  workflowEngineeringDebuggingChapters,
  workflowEngineeringReproducibilityChapters,
};
