export interface IModelItem {
  Id: String;
  FullName: String;
  Email: String;
  Phone: String;
  Address: String;
  IsActive: Boolean;
}
export interface IState {
  DataItems: IModelItem[];
}
export const InitState: IState = {
  DataItems: [],
};
