import { QEntityModel, QPropContainer } from "./QEntityModel";

export class QEntityFactory {
  /**
   * Factory function to create a QEntity based on a given type (TypeModel) in a type-safe manner.
   * Possible properties are checked via automatic type mapping.
   *
   * @param collectionPath OData path to the entity collection
   * @param props mapped QPaths
   * @returns
   */
  static create<TypeModel, KeyModel extends keyof TypeModel>(
    collectionPath: string,
    props: QPropContainer<Required<TypeModel>>
  ): QEntityModel<Required<TypeModel>, KeyModel> {
    return {
      ...props,
      __collectionPath: collectionPath,
    };
  }
}
