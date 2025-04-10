import type { Chara } from './types';
import { getBody } from './body';

interface SvgCharaProps {
  chara: Chara;
}
export function SvgChara({ chara }: SvgCharaProps) {
  const body = getBody(chara);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-100 -100 200 200"
      stroke="black"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      >
      {body.element}
    </svg>
  );
}