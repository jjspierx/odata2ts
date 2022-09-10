import { QFilterExpression } from "../../QFilterExpression";
import { StandardFilterOperators } from "../../odata/ODataModel";
import { QOrderByExpression } from "../../QOrderByExpression";
import { createParsingRegexp, getExpressionValue, getParamValue, parseParamValue } from "../../param/UrlParamHelper";
import { UrlParamModel, UrlParamValueFormatter, UrlParamValueParser } from "../../param/UrlParamModel";
import { QPathModel } from "../QPathModel";

const URL_PARAM_CONFIG: UrlParamModel = { typePrefix: "guid" };
const URL_PARAM_REGEXP = createParsingRegexp(URL_PARAM_CONFIG);

export class QGuidV2Path implements QPathModel {
  public static getUrlConformValue: UrlParamValueFormatter<string> = (value) => {
    return getParamValue(value, URL_PARAM_CONFIG);
  };

  public static parseValueFromUrl: UrlParamValueParser<string> = (urlConformValue) => {
    return parseParamValue(urlConformValue, URL_PARAM_REGEXP);
  };

  constructor(private path: string) {
    if (!path || !path.trim()) {
      throw new Error("Path must be supplied!");
    }
  }

  private buildBuiltInOp(operator: StandardFilterOperators, value: string | this) {
    return new QFilterExpression(`${this.path} ${operator} ${getExpressionValue(value, URL_PARAM_CONFIG)}`);
  }

  /**
   * Get the path to this property.
   *
   * @returns this property path
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * Order by this property in ascending order.
   *
   * @returns orderby expression
   */
  public ascending() {
    return new QOrderByExpression(`${this.path} asc`);
  }
  public asc = this.ascending;

  /**
   * Order by this property in descending order.
   *
   * @returns orderby expression
   */
  public descending() {
    return new QOrderByExpression(`${this.path} desc`);
  }
  public desc = this.descending;

  public isNull() {
    return new QFilterExpression(`${this.path} eq null`);
  }

  public isNotNull() {
    return new QFilterExpression(`${this.path} ne null`);
  }

  public equals(value: string) {
    return this.buildBuiltInOp(StandardFilterOperators.EQUALS, value);
  }
  public eq = this.equals;

  public notEquals(value: string) {
    return this.buildBuiltInOp(StandardFilterOperators.NOT_EQUALS, value);
  }
  public ne = this.notEquals;

  public lowerThan(value: string) {
    return this.buildBuiltInOp(StandardFilterOperators.LOWER_THAN, value);
  }
  public lt = this.lowerThan;

  public lowerEquals(value: string) {
    return this.buildBuiltInOp(StandardFilterOperators.LOWER_EQUALS, value);
  }
  public le = this.lowerEquals;

  public greaterThan(value: string) {
    return this.buildBuiltInOp(StandardFilterOperators.GREATER_THAN, value);
  }
  public gt = this.greaterThan;

  public greaterEquals(value: string) {
    return this.buildBuiltInOp(StandardFilterOperators.GREATER_EQUALS, value);
  }
  public ge = this.greaterEquals;

  public in(...values: Array<string>) {
    return values.reduce((expression, value) => {
      const expr = this.buildBuiltInOp(StandardFilterOperators.EQUALS, value);
      return expression ? expression.or(expr) : expr;
    }, null as unknown as QFilterExpression);
  }
}