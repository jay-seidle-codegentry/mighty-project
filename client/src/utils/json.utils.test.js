const d = require('./json.utils');

it("Validate Successful Response", () => {
    const success = d.successResponse("it worked");
    const value = JSON.stringify(success);
    expect(value).toContain("success");
    expect(value).toContain("it worked");
});

it("Validate Error Response", () => {
    const error = d.errorResponse("bad stuff");
    const value = JSON.stringify(error);
    expect(value).toContain("error");
    expect(value).toContain("bad stuff");
});