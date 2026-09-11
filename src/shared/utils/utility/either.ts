export enum EitherType {
  Left = "Left",
  Right = "Right",
}

export type Either<L, R> = {
  fold: (onLeft: (l: L) => void, onRight: (r: R) => void) => void;
} & ({ tag: EitherType.Left; left: L } | { tag: EitherType.Right; right: R });

export const left = <L, R = never>(l: L): Either<L, R> => ({
  tag: EitherType.Left,
  left: l,
  fold: (onLeft, _onRight) => {
    onLeft(l);
  },
});

export const right = <R, L = never>(r: R): Either<L, R> => ({
  tag: EitherType.Right,
  right: r,
  fold: (_onLeft, onRight) => {
    onRight(r);
  },
});
