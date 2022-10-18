
//reference https://dev.to/eetukudo_/server-side-testing-with-jest

import {describe, expect} from "@jest/globals";

 const server = require("../src/server")
 
describe('test router', () => {
    describe('getData', () => {
      it('should return a 200', () => {
        request(server).get('getData').then((res) => {
          expect(res.statusCode).toBe(200);
        });
      });
    });
  });