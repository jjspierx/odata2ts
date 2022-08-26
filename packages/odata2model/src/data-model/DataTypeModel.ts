export enum ODataVersion {
  V2 = "2.0",
  V4 = "4.0",
}

export const enum DataTypes {
  PrimitiveType = "PrimitiveType",
  EnumType = "EnumType",
  ComplexType = "ComplexType",
  ModelType = "ModelType",
}

export const enum OperationTypes {
  Function = "Function",
  Action = "Action",
}

export interface PropertyModel {
  odataName: string;
  name: string;
  odataType: string;
  type: string;
  qObject?: string;
  qPath: string;
  required: boolean;
  isCollection: boolean;
  dataType: DataTypes;
}

export interface ModelType extends ComplexType {
  keyNames: Array<string>;
  keys: Array<PropertyModel>;
  getKeyUnion(): string;
}

export interface ComplexType {
  odataName: string;
  name: string;
  qName: string;
  props: Array<PropertyModel>;
  baseProps: Array<PropertyModel>;
  baseClasses: Array<string>;
}

export interface EnumType {
  odataName: string;
  name: string;
  members: Array<string>;
}

export interface OperationType {
  odataName: string;
  name: string;
  type: OperationTypes;
  parameters: Array<PropertyModel>;
  returnType?: ReturnTypeModel;
  usePost?: boolean;
}

export interface ReturnTypeModel extends PropertyModel {}

export type EntityContainerModel = {
  entitySets: { [name: string]: EntitySetType };
  singletons: { [name: string]: SingletonType };
  functions: { [name: string]: FunctionImportType };
  actions: { [name: string]: ActionImportType };
};

export interface SingletonType {
  odataName: string;
  name: string;
  type: ModelType;
  navPropBinding?: Array<NavPropBindingType>;
}

export interface EntitySetType {
  odataName: string;
  name: string;
  entityType: ModelType;
  navPropBinding?: Array<NavPropBindingType>;
}

export interface NavPropBindingType {
  path: string;
  target: string;
}

export interface ActionImportType {
  odataName: string;
  name: string;
  operation: OperationType;
}

export interface FunctionImportType extends ActionImportType {
  entitySet: string;
}
