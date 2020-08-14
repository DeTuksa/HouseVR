// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface} from 'react-360-web';
import WebVRPolyfill from 'webvr-polyfill';

const polyfill = new WebVRPolyfill();

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  const buttonPanel = new Surface(
    400, 400, Surface.SurfaceShape.Flat
  );

  buttonPanel.setAngle(
    -0.6, 0.1
  );

  const infoPanel = new Surface(
    400, 550, Surface.SurfaceShape.Flat
  );

  infoPanel.setAngle(
    0.6, 0.1
  );


  r360.renderToSurface(
    r360.createRoot('ConnectedButtons', { /* initial props */ }),
    buttonPanel
  );

  r360.renderToSurface(
    r360.createRoot('ConnectedInfoPanel', { /* initial props */ }),
    infoPanel
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_front_door.jpg'));
}

window.React360 = {init};
