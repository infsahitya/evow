export default function __formatObj(_obj: Record<string, any>) {
  return JSON.stringify(_obj, null, 2);
}
