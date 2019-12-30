/* eslint-disable no-unused-expressions */
import { fixture, assert } from "@open-wc/testing";

import "../ib-modal-component.js";

describe("Suite cases", () => {
  it("Case default", async () => {
    const _element = await fixture("<ib-modal-component></ib-modal-component>");
    assert.strictEqual(_element.hello, 'Hello World!');
  });
});
