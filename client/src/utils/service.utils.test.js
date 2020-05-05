const d = require("./service.utils");

it("test fetch-it", async () => {
  jest.spyOn(global, "fetch").mockImplementation((endPoint, headers) => {
    const mockResponse = { ep: endPoint, h: headers };
    const mockJsonResponse = Promise.resolve(mockResponse);
    const mockFetchResponse = Promise.resolve({ json: () => mockJsonResponse });
    return mockFetchResponse;
  });
  const compareValue = JSON.stringify({
    ep: "anEndPoint",
    h: { headers: { Authorization: "Bearer aToken" } },
  });
  const ret = await d.fetchIt({ token: "aToken", endPoint: "anEndPoint" });
  const retAsString = JSON.stringify(ret);
  expect(retAsString).toContain(compareValue);
});
