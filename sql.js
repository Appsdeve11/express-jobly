
const { BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("../path/to/sqlForPartialUpdate");

/**
 
 *
 * @param {object} dataToUpdate 
 * @param {object} jsToSql 
 * @returns {object} 
 * @throws {BadRequestError}
 */
describe("sqlForPartialUpdate", () => {
  it("should generate the SQL query string and parameter values", () => {
    const dataToUpdate = {
      firstName: "Aliya",
      age: 32,
    };

    const jsToSql = {
      firstName: "first_name",
    };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });

  it("should generate the SQL query string and parameter values without mapping", () => {
    const dataToUpdate = {
      firstName: "Aliya",
      age: 32,
    };

    const result = sqlForPartialUpdate(dataToUpdate);

    expect(result).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });

  it("should throw BadRequestError if dataToUpdate is empty", () => {
    const dataToUpdate = {};

    expect(() => {
      sqlForPartialUpdate(dataToUpdate);
    }).toThrow(BadRequestError);
  });
});