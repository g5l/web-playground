import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';

import FadeIn from './examples/FadeIn';
import ExpandCollapse from './examples/ExpandCollapse';
import ListTransition from './examples/ListTransition';
import ThirdPartyWrapped from './examples/ThirdPartyWrapped';
import TrailStagger from './examples/TrailStagger';
// import SpringsCards from './examples/SpringsCards';
import ChainSequence from './examples/ChainSequence';
import AsyncSequence from './examples/AsyncSequence';
// import AsyncLoop from './examples/AsyncLoop';
import SvgPathDraw from './examples/SvgPathDraw';
import InterpolateColor from './examples/InterpolateColor';

export default function App() {
  return (
    <div className="app">
      <Nav />
      <div className="page">
        <Routes>
          <Route path="/" element={<FadeIn />} />
          <Route path="/fade-in" element={<FadeIn />} />
          <Route path="/expand-collapse" element={<ExpandCollapse />} />
          <Route path="/list-transition" element={<ListTransition />} />
          <Route path="/third-party" element={<ThirdPartyWrapped />} />
          <Route path="/trail-stagger" element={<TrailStagger />} />
          {/*<Route path="/springs-cards" element={<SpringsCards />} />*/}
          <Route path="/chain-sequence" element={<ChainSequence />} />
          <Route path="/async-sequence" element={<AsyncSequence />} />
          {/*<Route path="/async-loop" element={<AsyncLoop />} />*/}
          <Route path="/svg-path" element={<SvgPathDraw />} />
          <Route path="/interpolate-color" element={<InterpolateColor />} />
        </Routes>
      </div>
    </div>
  );
}
