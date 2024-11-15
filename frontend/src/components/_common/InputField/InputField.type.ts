export interface InputType {
  value: string;
  status: InputStatus;
  message: string;
}

export type InputStatus = 'DEFAULT' | 'ERROR' | 'SUCCESS';
