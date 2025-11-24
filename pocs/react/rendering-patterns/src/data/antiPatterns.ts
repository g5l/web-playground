export const antiPatterns = [
  { slug: 'index-as-key', title: 'Using Index as Key', component: 'IndexAsKey' },
  { slug: 'overusing-context', title: 'Overusing Context', component: 'OverusingContext' },
  { slug: 'side-effects-in-render', title: 'Side Effects in Render', component: 'SideEffectsInRender' },
  { slug: 'mutating-state-directly', title: 'Mutating State Directly', component: 'MutatingStateDirectly' },
  { slug: 'unstable-props', title: 'Unstable Props', component: 'UnstableProps' }
] as const;
