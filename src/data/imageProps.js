// Original dimensions reserve layout space; browsers choose a smaller local copy.
const dimensions = {
  'thimira.jpeg': [1071, 1428],
  'nearu-live.jpg': [1440, 900],
  'ayurflow-sign-in.png': [1366, 768],
  'project-2.png': [1524, 863],
  'project-3.png': [1535, 863],
  'project-4.jpeg': [360, 609],
  'project-5.png': [1535, 863],
  'project-6.png': [1918, 927],
  'project-7.png': [1535, 841],
  'project-8.png': [1248, 763],
};

export default function imageProps(src, sizes) {
  const file = src?.split('/').pop();
  const size = dimensions[file];
  if (!size) return { width: 1600, height: 1000 };
  const name = file.replace(/\.[^.]+$/, '');
  const widths = [320, 640, 960].filter((width) => width <= size[0]);
  return {
    width: size[0], height: size[1], sizes,
    srcSet: widths.map((width) => `${import.meta.env.BASE_URL.slice(0, -1)}/images/responsive/${name}-${width}.jpg ${width}w`).join(', '),
  };
}
