export class StateModel<T> {
  type: StateType = StateType.initial;
  message?: string | null;
  data?: T;
}

export enum StateType {
  initial = "initial",
  loading = "loading",
  success = "success",
  error = "error",
}
