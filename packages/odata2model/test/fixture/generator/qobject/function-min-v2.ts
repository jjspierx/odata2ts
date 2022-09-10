import { QFunction, QStringParam } from "@odata2ts/odata-query-objects";

// @ts-ignore
import { MinFunctionParams } from "./TesterModel";

export class QMinFunction extends QFunction<MinFunctionParams> {
  private readonly params = [new QStringParam("test"), new QStringParam("optTest")];

  constructor() {
    super("MinFunction", true);
  }

  getParams() {
    return this.params;
  }
}