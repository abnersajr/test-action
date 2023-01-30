const generateSVGPie = (percentages: number[]) => {
  let currentDegree = 0;
  const paths: string[] = [];

  // Iterate through the percentages array and create a path for each range
  percentages.forEach((percentage) => {
    const degree = (percentage / 100) * 360;

    // Define the path data
    const x1 = 100,
      y1 = 100,
      r = 80;
    const x2 = 100 + r * Math.cos((currentDegree * Math.PI) / 180),
      y2 = 100 - r * Math.sin((currentDegree * Math.PI) / 180),
      x3 = 100 + r * Math.cos(((currentDegree + degree) * Math.PI) / 180),
      y3 = 100 - r * Math.sin(((currentDegree + degree) * Math.PI) / 180);
    const largeArc = degree > 180 ? 1 : 0;
    const pathData = `M ${x1} ${y1} L ${x2} ${y2} A ${r} ${r} 0 ${largeArc} 1 ${x3} ${y3} Z`;

    // Add the path element to the array as a string
    paths.push(
      `<path fill="none" stroke="black" stroke-width="2" d="${pathData}"></path>`
    );

    // Update the current degree for the next path
    currentDegree += degree;
  });

  // Append the SVG element to the body
  return `<svg width="200" height="200">
      ${paths.join("")}
    </svg>' />`;
};
