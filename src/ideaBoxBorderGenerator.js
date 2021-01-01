const configs = {
  opened: {
    MouthRadius: 41,
    DepthRadius: 26,
    MouthWidth: 119,
    MaxDepth: 20
  },
  closed: {
    MouthRadius: 26,
    DepthRadius: 17,
    MouthWidth: 85,
    MaxDepth: 14
  }
};

function toDeg(rad) {
  return (rad * Math.PI) / 180;
}

function controlPoint(degree, domain, t) {
  return {
    x: Math.cos(toDeg(degree)) * domain + t.x,
    y: Math.sin(toDeg(degree)) * domain + t.y
  };
}

function createCurve(
  w = 400,
  h = 200,
  ph = 60,
  pw = 110,
  pc = 130,
  deep = 1,
  mouthRadius = 30,
  depthRadius = 60
) {
  const pitStart = { x: pc - pw / 2, y: 0 };
  const pitEnd = { x: pitStart.x + pw, y: 0 };
  const pitDepth = { x: pc, y: ph * deep };

  const deepAbs = Math.abs(deep);
  const pc1 = controlPoint(0, mouthRadius * deepAbs, pitStart);
  const pc2 = controlPoint(180, depthRadius * deepAbs, pitDepth);
  const pc3 = controlPoint(0, depthRadius * deepAbs, pitDepth);
  const pc4 = controlPoint(-180, mouthRadius * deepAbs, pitEnd);

  const path = `
  M0,0 
  L${pitStart.x},${pitStart.y} 
  C${pc1.x},${pc1.y} ${pc2.x},${pc2.y} ${pitDepth.x},${pitDepth.y} 
  C${pc3.x},${pc3.y} ${pc4.x},${pc4.y} ${pitEnd.x},${pitEnd.y}
  L${w},0 
  L${w},${h} 
  L0,${h} 
  L0,0
  `;

  return { path, pc1, pitStart, pc2, pc3, pc4 };
}

export function createBorderPath(
  depthPercentage,
  width,
  height,
  profilePlaceholderCenterX,
  config = "opened"
) {
  const params = typeof config === "object" ? config : configs[config];
  const { path } = createCurve(
    width,
    height,
    params.MaxDepth,
    params.MouthWidth,
    profilePlaceholderCenterX,
    depthPercentage,
    params.MouthRadius,
    params.DepthRadius
  );

  return path;
}
